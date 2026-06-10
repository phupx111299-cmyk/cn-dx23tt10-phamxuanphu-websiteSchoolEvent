import { Field, PageShell, SectionTitle, SelectField } from "@/components/ui";
import { getFaculties } from "@/lib/supabase-rest";

export default async function ProfilePage(){
  const faculties = await getFaculties();
  return <PageShell><SectionTitle eyebrow="Sinh viên" title="Hồ sơ cá nhân"/><form className="grid gap-4 rounded-[2rem] border border-slate-200 bg-white p-8 md:grid-cols-2"><Field name="student_code" label="Mã sinh viên" placeholder="SV001"/><Field name="full_name" label="Họ tên" placeholder="Nguyễn Văn An"/><Field name="email" label="Email" placeholder="sv001@university.edu.vn"/><SelectField name="faculty" label="Khoa" options={faculties.map(f=>f.name)}/><button className="rounded-2xl bg-blue-700 px-5 py-3 font-bold text-white md:col-span-2">Lưu thay đổi</button></form></PageShell>;
}
