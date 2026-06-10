import { notFound } from "next/navigation";
import { AdminLayout } from "@/components/admin-layout";
import { EventForm } from "@/components/event-form";
import { deleteEventAction, getEvent } from "@/lib/supabase-rest";

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await getEvent(id);
  if (!event) notFound();
  return <AdminLayout title="Chỉnh sửa sự kiện"><EventForm event={event} /><form action={deleteEventAction} className="mt-4"><input type="hidden" name="event_id" value={event.id}/><button className="rounded-2xl bg-rose-600 px-5 py-3 font-bold text-white">Xóa sự kiện</button></form></AdminLayout>;
}
