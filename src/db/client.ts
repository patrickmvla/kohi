// src/db/client.ts
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

if (!process.env.TURSO_DATABASE_URL) {
  console.warn(
    "TURSO_DATABASE_URL missing — DB features disabled until env is set."
  );
}

const client = process.env.TURSO_DATABASE_URL
  ? createClient({
      url: process.env.TURSO_DATABASE_URL!,
      authToken: process.env.TURSO_AUTH_TOKEN,
    })
  : null;

export const db = client ? drizzle(client, { schema }) : null;
export type DB = typeof db;
