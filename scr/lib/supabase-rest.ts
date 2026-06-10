import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
const appSecret = process.env.SUPABASE_APP_SECRET ?? "school-event-demo-secret-2026";

export type EventRow = {
  id: string; title: string; slug: string; description: string; organizer: string; location: string;
  start_time: string; end_time: string; capacity: number; image_url: string | null; status: string; created_at: string;
  faculty: string | null; category: string | null; registered_count: number; attended_count: number;
};
export type ParticipantRow = { registration_id: string; qr_token: string; registration_status: string; registered_at: string; full_name: string; email: string; student_code: string | null; faculty: string | null; event_id: string; event_title: string; attendance_id: string | null; checked_in_at: string | null; };
export type AssignmentRow = { id: string; task_name: string; task_description: string | null; due_date: string | null; status: string; event_id: string; event_title: string; assignee_name: string | null; assignee_email: string | null; };
export type NotificationRow = { id: string; title: string; content: string; channel: string; sent_at: string | null; created_at: string; event_id: string | null; event_title: string | null; };
export type NamedRow = { id: string; name: string };

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  noStore();
  const res = await fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", ...(init?.headers ?? {}) },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<T>;
}

async function rpc<T>(fn: string, body: Record<string, unknown>): Promise<T> {
  noStore();
  const res = await fetch(`${url}/rest/v1/rpc/${fn}`, {
    method: "POST",
    headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ secret: appSecret, ...body }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<T>;
}

export function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("vi-VN", { dateStyle: "short", timeStyle: "short", timeZone: "Asia/Ho_Chi_Minh" }).format(new Date(value));
}
export function toDate(value: string) { return new Intl.DateTimeFormat("vi-VN", { dateStyle: "short", timeZone: "Asia/Ho_Chi_Minh" }).format(new Date(value)); }
export function toTimeRange(start: string, end: string) {
  const fmt = new Intl.DateTimeFormat("vi-VN", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Ho_Chi_Minh" });
  return `${fmt.format(new Date(start))} - ${fmt.format(new Date(end))}`;
}

export async function getEvents() { return rpc<EventRow[]>("app_get_events", {}); }
export async function getPublishedEvents() { const rows = await getEvents(); return rows.filter((event) => ["published", "ended"].includes(event.status)); }
export async function getEvent(slug: string) { const rows = await getEvents(); return rows.find((event) => event.slug === slug) ?? null; }
export async function getFaculties() { return request<NamedRow[]>("faculties?select=id,name&order=name.asc"); }
export async function getCategories() { return request<NamedRow[]>("event_categories?select=id,name&order=name.asc"); }
export async function getParticipants() { return rpc<ParticipantRow[]>("app_get_participants", {}); }
export async function getAssignments() { return rpc<AssignmentRow[]>("app_get_assignments", {}); }
export async function getNotifications() { return rpc<NotificationRow[]>("app_get_notifications", {}); }

export async function createEventAction(formData: FormData) {
  "use server";
  await rpc<string>("app_create_event", {
    p_title: String(formData.get("title") ?? ""),
    p_description: String(formData.get("description") ?? ""),
    p_organizer: String(formData.get("organizer") ?? ""),
    p_location: String(formData.get("location") ?? ""),
    p_start_time: new Date(`${formData.get("start_date")}T${formData.get("start_time")}:00+07:00`).toISOString(),
    p_end_time: new Date(`${formData.get("end_date") || formData.get("start_date")}T${formData.get("end_time") || formData.get("start_time")}:00+07:00`).toISOString(),
    p_capacity: Number(formData.get("capacity") ?? 0),
    p_faculty_name: String(formData.get("faculty") ?? "Khác"),
    p_category_name: String(formData.get("category") ?? "Khác"),
    p_image_url: String(formData.get("image_url") ?? ""),
    p_status: String(formData.get("status") ?? "published"),
  });
  revalidatePath("/admin/events"); revalidatePath("/events"); redirect("/admin/events");
}

export async function updateEventAction(formData: FormData) {
  "use server";
  await rpc<string>("app_update_event", {
    p_event_id: String(formData.get("event_id") ?? ""),
    p_title: String(formData.get("title") ?? ""),
    p_description: String(formData.get("description") ?? ""),
    p_organizer: String(formData.get("organizer") ?? ""),
    p_location: String(formData.get("location") ?? ""),
    p_start_time: new Date(`${formData.get("start_date")}T${formData.get("start_time")}:00+07:00`).toISOString(),
    p_end_time: new Date(`${formData.get("end_date") || formData.get("start_date")}T${formData.get("end_time") || formData.get("start_time")}:00+07:00`).toISOString(),
    p_capacity: Number(formData.get("capacity") ?? 0),
    p_faculty_name: String(formData.get("faculty") ?? "Khác"),
    p_category_name: String(formData.get("category") ?? "Khác"),
    p_image_url: String(formData.get("image_url") ?? ""),
    p_status: String(formData.get("status") ?? "published"),
  });
  revalidatePath("/admin/events"); revalidatePath("/events"); redirect("/admin/events");
}

export async function deleteEventAction(formData: FormData) {
  "use server";
  await rpc<boolean>("app_delete_event", { p_event_id: String(formData.get("event_id") ?? "") });
  revalidatePath("/admin/events"); revalidatePath("/events"); redirect("/admin/events");
}

export async function registerStudentAction(formData: FormData) {
  "use server";
  const result = await rpc<{ registration_id: string; qr_token: string }[]>("app_register_student", {
    p_event_id: String(formData.get("event_id") ?? ""),
    p_full_name: String(formData.get("full_name") ?? ""),
    p_email: String(formData.get("email") ?? ""),
    p_student_code: String(formData.get("student_code") ?? ""),
    p_faculty_name: String(formData.get("faculty") ?? "Khác"),
  });
  const token = result?.[0]?.qr_token ?? "";
  revalidatePath("/admin/participants"); redirect(`/student/qr?token=${encodeURIComponent(token)}`);
}

export async function checkInAction(formData: FormData) {
  "use server";
  await rpc("app_check_in", { p_qr_token: String(formData.get("qr_token") ?? ""), p_registration_id: null });
  revalidatePath("/admin/check-in"); revalidatePath("/admin/participants"); redirect("/admin/check-in?status=success");
}

export async function createAssignmentAction(formData: FormData) {
  "use server";
  await rpc("app_create_assignment", {
    p_event_id: String(formData.get("event_id") ?? ""), p_task_name: String(formData.get("task_name") ?? ""),
    p_task_description: String(formData.get("task_description") ?? ""), p_assignee_email: String(formData.get("assignee_email") ?? ""),
    p_assignee_name: String(formData.get("assignee_name") ?? ""), p_due_date: String(formData.get("due_date") ?? "") || null,
  });
  revalidatePath("/admin/assignments"); redirect("/admin/assignments");
}

export async function createNotificationAction(formData: FormData) {
  "use server";
  await rpc("app_create_notification", {
    p_title: String(formData.get("title") ?? ""), p_content: String(formData.get("content") ?? ""),
    p_channel: String(formData.get("channel") ?? "system"), p_event_id: String(formData.get("event_id") ?? "") || null,
    p_send_now: formData.get("send_now") === "on",
  });
  revalidatePath("/admin/notifications"); redirect("/admin/notifications");
}
