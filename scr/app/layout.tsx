import type { Metadata } from "next";
import "./globals.css";
import { Footer, Header } from "@/components/ui";
export const metadata: Metadata = { title: "School Events | Quản lý sự kiện đại học", description: "Website quản lý sự kiện, đăng ký tham gia, điểm danh QR và báo cáo trong trường đại học." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="vi" className="h-full antialiased"><body className="min-h-full bg-slate-50 text-slate-950"><div className="flex min-h-screen flex-col"><Header />{children}<Footer /></div></body></html>; }
