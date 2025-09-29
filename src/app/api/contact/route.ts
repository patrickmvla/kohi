// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/schemas/contact";
import { db } from "@/db/client";
import { emails } from "@/db/schema";
import { eq } from "drizzle-orm";

export const runtime = "nodejs"; // keep Node for DB

function escapeHtml(s: string) {
  return s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[
        c
      ]!)
  );
}

export async function POST(req: Request) {
  let parsed;
  try {
    const body = await req.json();
    parsed = contactSchema.safeParse(body);
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON" },
      { status: 400 }
    );
  }
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { name, email, message, hp, started } = parsed.data;
  if (hp)
    return NextResponse.json(
      { ok: false, error: "Spam detected" },
      { status: 400 }
    );
  if (Number.isFinite(started) && Date.now() - (started as number) < 1200) {
    return NextResponse.json(
      { ok: false, error: "Please take a moment to complete the form." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM;
  const to = process.env.CONTACT_TO;
  if (!apiKey || !from || !to) {
    return NextResponse.json(
      { ok: false, error: "Email service is not configured." },
      { status: 500 }
    );
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
  const userAgent = req.headers.get("user-agent") ?? null;

  // 1) Insert email record (status=received)
  let emailId: number | undefined;
  if (db) {
    try {
      const rows = await db
        .insert(emails)
        .values({
          name,
          email,
          message,
          status: "received",
          ip: ip ?? undefined,
          userAgent: userAgent ?? undefined,
        })
        .returning({ id: emails.id });
      emailId = rows[0]?.id;
    } catch (e) {
      console.error("DB insert error", e);
    }
  }

  // 2) Send via Resend
  const resend = new Resend(apiKey);
  const subject = `New contact from ${name} — kohi`;
  const text = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  const html = `
  <div style="font-family:ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;line-height:1.6">
    <h2 style="margin:0 0 8px">New contact</h2>
    <p style="margin:0 0 6px"><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p style="margin:0 0 6px"><strong>Email:</strong> ${escapeHtml(email)}</p>
    <pre style="white-space:pre-wrap;background:#0b0b0b;padding:12px;border-radius:8px;border:1px solid rgba(255,255,255,.1);color:#e5e5e5;margin-top:12px">${escapeHtml(
      message
    )}</pre>
  </div>`;

  try {
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      text,
      html,
      replyTo: email,
    });
    if (db && emailId) {
      await db
        .update(emails)
        .set({
          status: error ? "error" : "sent",
          resendId: data?.id,
          error: error ? String(error) : null,
        })
        .where(eq(emails.id, emailId));
    }
    if (error) {
      console.error("Resend error", error);
      return NextResponse.json(
        { ok: false, error: "Failed to send. Try again later." },
        { status: 502 }
      );
    }
    return NextResponse.json({
      ok: true,
      message: "Thanks — I’ll get back to you soon.",
    });
  } catch (e) {
    console.error("Resend exception", e);
    if (db && emailId) {
      await db
        .update(emails)
        .set({ status: "error", error: "Exception while sending" })
        .where(eq(emails.id, emailId));
    }
    return NextResponse.json(
      { ok: false, error: "Failed to send. Try again later." },
      { status: 500 }
    );
  }
}
