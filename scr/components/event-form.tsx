import type { EventRow } from "@/lib/supabase-rest";
import { createEventAction, getCategories, getFaculties, updateEventAction } from "@/lib/supabase-rest";
import { Field, SelectField, TextareaField } from "./ui";

function inputDate(value?: string) { return value ? new Date(value).toISOString().slice(0, 10) : undefined; }
function inputTime(value?: string) { return value ? new Date(value).toISOString().slice(11, 16) : undefined; }

export async function EventForm({ event }: { event?: EventRow | null }) {
  const [faculties, categories] = await Promise.all([getFaculties(), getCategories()]);
  return <form action={event ? updateEventAction : createEventAction} className="grid gap-4 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm md:grid-cols-2">
    {event ? <input type="hidden" name="event_id" value={event.id} /> : null}
    <Field name="title" label="Tên sự kiện" placeholder="Nhập tên sự kiện" required defaultValue={event?.title} />
    <SelectField name="category" label="Loại sự kiện" options={categories.map(x=>x.name)} defaultValue={event?.category ?? undefined} />
    <SelectField name="faculty" label="Khoa / đơn vị tổ chức" options={faculties.map(x=>x.name)} defaultValue={event?.faculty ?? undefined} />
    <Field name="organizer" label="Đơn vị tổ chức" placeholder="Khoa Công nghệ thông tin" required defaultValue={event?.organizer} />
    <Field name="location" label="Địa điểm" placeholder="Hội trường A" required defaultValue={event?.location} />
    <Field name="capacity" label="Sức chứa" type="number" placeholder="300" required defaultValue={event?.capacity?.toString()} />
    <Field name="start_date" label="Ngày bắt đầu" type="date" required defaultValue={inputDate(event?.start_time)} />
    <Field name="start_time" label="Giờ bắt đầu" type="time" required defaultValue={inputTime(event?.start_time)} />
    <Field name="end_date" label="Ngày kết thúc" type="date" defaultValue={inputDate(event?.end_time)} />
    <Field name="end_time" label="Giờ kết thúc" type="time" defaultValue={inputTime(event?.end_time)} />
    <Field name="image_url" label="Ảnh đại diện" placeholder="URL ảnh" defaultValue={event?.image_url ?? undefined} />
    <SelectField name="status" label="Trạng thái" options={["published","draft","ended","cancelled"]} defaultValue={event?.status}/>
    <TextareaField name="description" label="Mô tả" placeholder="Nội dung, mục tiêu và thông tin tham dự" required defaultValue={event?.description} />
    <button className="rounded-2xl bg-blue-700 px-5 py-3 font-bold text-white md:col-span-2">{event ? "Cập nhật sự kiện" : "Lưu sự kiện"}</button>
  </form>;
}
