import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import { ContactFormData } from "./validations";

export interface StoredMessage extends ContactFormData {
  id: string;
  createdAt: string;
  status: "unread" | "read" | "replied";
  source: "supabase" | "local";
}

// 1. Supabase Client Initialization (if env keys exist)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey)
    : null;

// Local persistent fallback directory
const DATA_DIR = path.join(process.cwd(), "data");
const MESSAGES_FILE = path.join(DATA_DIR, "messages.json");

function ensureLocalDb() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(MESSAGES_FILE)) {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify([], null, 2), "utf-8");
  }
}

/**
 * Save incoming message to Supabase PostgreSQL if configured,
 * otherwise safely persists to local database.
 */
export async function saveMessage(data: ContactFormData): Promise<StoredMessage> {
  const timestamp = new Date().toISOString();
  const id = `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  // Option A: Save to Cloud PostgreSQL via Supabase
  if (supabase) {
    try {
      const { data: inserted, error } = await supabase
        .from("contact_messages")
        .insert([
          {
            name: data.name,
            email: data.email,
            message: data.message,
            created_at: timestamp,
            status: "unread",
          },
        ])
        .select()
        .single();

      if (!error && inserted) {
        return {
          id: inserted.id || id,
          name: inserted.name,
          email: inserted.email,
          message: inserted.message,
          createdAt: inserted.created_at || timestamp,
          status: inserted.status || "unread",
          source: "supabase",
        };
      }
      console.warn("Supabase insert returned error, falling back to local storage:", error);
    } catch (err) {
      console.warn("Supabase connection error, falling back to local storage:", err);
    }
  }

  // Option B: Local persistent file storage
  ensureLocalDb();
  const raw = fs.readFileSync(MESSAGES_FILE, "utf-8");
  const messages: StoredMessage[] = JSON.parse(raw || "[]");

  const storedMsg: StoredMessage = {
    id,
    name: data.name,
    email: data.email,
    message: data.message,
    createdAt: timestamp,
    status: "unread",
    source: "local",
  };

  messages.unshift(storedMsg);
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), "utf-8");

  return storedMsg;
}

/**
 * Retrieve messages for review
 */
export async function getMessages(): Promise<StoredMessage[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        return data.map((item) => ({
          id: item.id,
          name: item.name,
          email: item.email,
          message: item.message,
          createdAt: item.created_at,
          status: item.status || "unread",
          source: "supabase",
        }));
      }
    } catch (err) {
      console.warn("Error fetching from Supabase:", err);
    }
  }

  ensureLocalDb();
  try {
    const raw = fs.readFileSync(MESSAGES_FILE, "utf-8");
    return JSON.parse(raw || "[]");
  } catch {
    return [];
  }
}

