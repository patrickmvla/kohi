"use server";

import { Resend } from "resend";

type ActionState = {
  ok: boolean;
  message?: string;
  error?: string;
  email?: string;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendContact(
  _prevState: ActionState | undefined,
  formData: FormData
): Promise<ActionState> {
  // Honeypot + time trap
  const hp = String(formData.get("hp") ?? "");
  if (hp) return { ok: false, error: "Spam detected." };

  const started = Number(formData.get("started") ?? 0);
  if (Number.isFinite(started) && Date.now() - started < 1200) {
    return { ok: false, error: "Please take a moment to complete the form." };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message)
    return { ok: false, error: "Please fill in all fields." };
  if (!emailRegex.test(email))
    return { ok: false, error: "Please enter a valid email." };

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  const from = process.env.CONTACT_FROM;
  if (!apiKey || !to || !from)
    return { ok: false, error: "Email service is not configured." };

  const resend = new Resend(apiKey);
  const subject = `New contact from ${name} — kohi`;
  const text = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  const html = `
  <div style="font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; line-height:1.6">
    <h2 style="margin:0 0 8px">New contact</h2>
    <p style="margin:0 0 6px"><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p style="margin:0 0 6px"><strong>Email:</strong> ${escapeHtml(email)}</p>
    <pre style="white-space:pre-wrap; background:#0b0b0b; padding:12px; border-radius:8px; border:1px solid rgba(255,255,255,.1); color:#e5e5e5; margin-top:12px">${escapeHtml(
      message
    )}</pre>
  </div>`;

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      subject,
      text,
      html,
      replyTo: email,
    });
    if (error)
      return { ok: false, error: "Failed to send. Please try again later." };
    return { ok: true, message: "Thanks — I’ll get back to you soon.", email };
  } catch (err) {
    console.error("Resend error", err);
    return { ok: false, error: "Failed to send. Please try again later." };
  }
}

function escapeHtml(s: string) {
  return s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[
        c
      ]!)
  );
}
