import Link from "next/link";
import { Field, PageShell, SelectField } from "@/components/ui";
import { getFaculties } from "@/lib/supabase-rest";

export default async function RegisterPage() {
  const faculties = await getFaculties();
  return <PageShell><div className="mx-auto max-w-2xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"><h1 className="text-3xl font-bold">Đăng ký tài khoản sinh viên</h1><form className="mt-6 grid gap-4 md:grid-cols-2"><Field name="student_code" label="Mã sinh viên" placeholder="SV0001"/><Field name="full_name" label="Họ tên" placeholder="Nguyễn Văn A"/><Field name="email" label="Email" placeholder="sv@university.edu.vn" type="email"/><SelectField name="faculty" label="Khoa" options={faculties.map(f=>f.name)}/><Field name="password" label="Mật khẩu" type="password"/><Field name="confirm_password" label="Nhập lại mật khẩu" type="password"/></form><Link href="/student" className="mt-6 inline-flex rounded-2xl bg-blue-700 px-5 py-3 font-bold text-white">Tạo tài khoản mẫu</Link></div></PageShell>;
}
