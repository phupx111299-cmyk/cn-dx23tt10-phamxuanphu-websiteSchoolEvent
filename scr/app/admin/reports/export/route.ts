import { getEvents } from "@/lib/supabase-rest";

export async function GET(request: Request) {
  const format = new URL(request.url).searchParams.get("format") ?? "csv";
  const events = await getEvents();
  const rows = [["Ten su kien","Khoa","Loai","Dang ky","Diem danh"], ...events.map(e => [e.title, e.faculty ?? "", e.category ?? "", String(e.registered_count), String(e.attended_count)])];
  const csv = rows.map(row => row.map(cell => `"${String(cell).replaceAll('"','""')}"`).join(",")).join("\n");
  if (format === "pdf") return new Response(`BAO CAO SU KIEN\n\n${csv}`, { headers: { "Content-Type": "application/pdf", "Content-Disposition": "attachment; filename=bao-cao-su-kien.pdf" } });
  return new Response(csv, { headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": "attachment; filename=bao-cao-su-kien.csv" } });
}
