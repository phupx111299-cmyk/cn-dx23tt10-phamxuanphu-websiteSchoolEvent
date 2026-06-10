# School Events - Hệ thống quản lý sự kiện đại học

Website hỗ trợ quản lý toàn bộ vòng đời của một sự kiện trong trường đại học: công bố sự kiện, đăng ký tham gia, cấp mã QR, điểm danh, phân công nhiệm vụ, gửi thông báo và xuất báo cáo.

## Tổng quan kiến trúc

- **Frontend và server:** Next.js App Router, React, TypeScript.
- **Giao diện:** Tailwind CSS và HeroUI styles.
- **Cơ sở dữ liệu:** Supabase, được truy cập qua REST API và PostgreSQL RPC.
- **Ngôn ngữ giao diện:** Tiếng Việt.
- **Múi giờ dữ liệu hiển thị:** `Asia/Ho_Chi_Minh`.
- **Nhóm người dùng:** khách truy cập, sinh viên và quản trị viên/ban tổ chức.

> Lưu ý: mã nguồn ứng dụng hiện được đặt trong thư mục `scr/` thay vì tên thông dụng `src/`. README mô tả theo đúng cấu trúc hiện tại của repository.

## Cây thư mục

```text
cn-dx23tt10-phamxuanphu-websiteSchoolEvent/
├── README.md
├── progress-report/
│   └── Đề cương báo cáo đồ án - Phú.doc
├── scr/
│   ├── app/
│   │   ├── admin/
│   │   │   ├── assignments/page.tsx
│   │   │   ├── categories/page.tsx
│   │   │   ├── check-in/page.tsx
│   │   │   ├── events/
│   │   │   │   ├── [id]/edit/page.tsx
│   │   │   │   ├── new/page.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── faculties/page.tsx
│   │   │   ├── notifications/page.tsx
│   │   │   ├── participants/page.tsx
│   │   │   ├── reports/
│   │   │   │   ├── export/route.ts
│   │   │   │   └── page.tsx
│   │   │   ├── users/page.tsx
│   │   │   └── page.tsx
│   │   ├── calendar/page.tsx
│   │   ├── events/
│   │   │   ├── [id]/page.tsx
│   │   │   └── page.tsx
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── student/
│   │   │   ├── events/page.tsx
│   │   │   ├── history/page.tsx
│   │   │   ├── notifications/page.tsx
│   │   │   ├── profile/page.tsx
│   │   │   ├── qr/page.tsx
│   │   │   └── page.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── admin-layout.tsx
│   │   ├── event-card.tsx
│   │   ├── event-form.tsx
│   │   └── ui.tsx
│   └── lib/
│       └── supabase-rest.ts
├── setup/
└── thesis/
    ├── abs/
    │   └── thuyet-trinh-school-events.pptx
    ├── doc/
    │   └── Đồ án CN-PXP-HTWQLSKTMTDH.docx
    ├── pdf/
    │   ├── Thuyết Trình.pdf
    │   └── Đồ án CN-PXP-HTWQLSKTMTDH.docx.pdf
    ├── poster/
    │   ├── poster-he-thong-quan-ly-su-kien.pdf
    │   └── poster-preview.png
    └── refs/
        └── Các tài liệu tham khảo PDF
```

Các tệp hệ thống như `.DS_Store` không thuộc logic ứng dụng nên không được trình bày trong cây thư mục.

## Chi tiết các thư mục cấp cao

| Đường dẫn | Vai trò |
|---|---|
| `README.md` | Tài liệu giới thiệu dự án, kiến trúc và bố cục repository. |
| `progress-report/` | Chứa đề cương hoặc báo cáo tiến độ đồ án. |
| `scr/` | Toàn bộ mã nguồn website. |
| `scr/app/` | Các trang, route và layout theo chuẩn Next.js App Router. |
| `scr/components/` | Các component giao diện dùng lại giữa nhiều trang. |
| `scr/lib/` | Lớp truy cập dữ liệu, kiểu dữ liệu và Server Actions. |
| `setup/` | Thư mục dự kiến chứa tệp cài đặt hoặc cấu hình; hiện đang trống. |
| `thesis/` | Toàn bộ sản phẩm học thuật đi kèm đồ án: báo cáo, slide, poster và tài liệu tham khảo. |

## Chi tiết `scr/app/`

### Thành phần gốc

| Tệp | Chức năng |
|---|---|
| `scr/app/layout.tsx` | Root layout của website; khai báo metadata, nạp CSS toàn cục và bọc mọi trang bằng `Header`/`Footer`. |
| `scr/app/page.tsx` | Trang chủ; hiển thị sự kiện nổi bật, thống kê tổng quan, sự kiện sắp diễn ra và bộ lọc nhanh. |
| `scr/app/globals.css` | CSS toàn cục, import Tailwind/HeroUI, khai báo màu nền, font và utility bổ sung. |
| `scr/app/favicon.ico` | Biểu tượng hiển thị trên tab trình duyệt. |

### Khu vực công khai

| Route | Tệp | Chức năng |
|---|---|---|
| `/events` | `scr/app/events/page.tsx` | Danh sách sự kiện; hỗ trợ tìm kiếm theo tên và lọc theo khoa/loại hình. |
| `/events/[id]` | `scr/app/events/[id]/page.tsx` | Chi tiết sự kiện và form đăng ký tham gia để nhận QR token. `[id]` hiện nhận `slug` của sự kiện. |
| `/calendar` | `scr/app/calendar/page.tsx` | Lịch sự kiện theo tháng. |
| `/login` | `scr/app/login/page.tsx` | Giao diện đăng nhập mẫu. |
| `/register` | `scr/app/register/page.tsx` | Giao diện đăng ký tài khoản sinh viên mẫu. |

### Khu vực sinh viên

| Route | Tệp | Chức năng |
|---|---|---|
| `/student` | `scr/app/student/page.tsx` | Dashboard sinh viên: thống kê đăng ký, điểm danh, thông báo và gợi ý sự kiện. |
| `/student/events` | `scr/app/student/events/page.tsx` | Danh sách sự kiện sinh viên đã đăng ký và trạng thái điểm danh. |
| `/student/history` | `scr/app/student/history/page.tsx` | Lịch sử các sự kiện đã điểm danh. |
| `/student/notifications` | `scr/app/student/notifications/page.tsx` | Danh sách thông báo dành cho sinh viên. |
| `/student/profile` | `scr/app/student/profile/page.tsx` | Form hồ sơ cá nhân mẫu. |
| `/student/qr` | `scr/app/student/qr/page.tsx` | Hiển thị QR token nhận được sau khi đăng ký sự kiện. |

### Khu vực quản trị

Mọi trang quản trị sử dụng chung component `AdminLayout` để hiển thị thanh điều hướng bên trái.

| Route | Tệp | Chức năng |
|---|---|---|
| `/admin` | `scr/app/admin/page.tsx` | Dashboard tổng quan số sự kiện, lượt đăng ký và lượt điểm danh. |
| `/admin/events` | `scr/app/admin/events/page.tsx` | Danh sách và quản lý sự kiện. |
| `/admin/events/new` | `scr/app/admin/events/new/page.tsx` | Tạo sự kiện mới. |
| `/admin/events/[id]/edit` | `scr/app/admin/events/[id]/edit/page.tsx` | Chỉnh sửa hoặc xóa sự kiện; `[id]` hiện nhận `slug`. |
| `/admin/participants` | `scr/app/admin/participants/page.tsx` | Danh sách người tham gia, trạng thái đăng ký/điểm danh và QR token. |
| `/admin/check-in` | `scr/app/admin/check-in/page.tsx` | Điểm danh bằng cách nhập QR token. |
| `/admin/assignments` | `scr/app/admin/assignments/page.tsx` | Tạo và theo dõi nhiệm vụ được phân công cho sự kiện. |
| `/admin/notifications` | `scr/app/admin/notifications/page.tsx` | Tạo, gửi hoặc lên lịch thông báo. |
| `/admin/reports` | `scr/app/admin/reports/page.tsx` | Thống kê sự kiện, đăng ký, điểm danh và xuất báo cáo. |
| `/admin/reports/export` | `scr/app/admin/reports/export/route.ts` | API route xuất dữ liệu báo cáo dạng CSV hoặc phản hồi tải xuống dạng PDF đơn giản. |
| `/admin/faculties` | `scr/app/admin/faculties/page.tsx` | Thống kê số sự kiện theo khoa. |
| `/admin/categories` | `scr/app/admin/categories/page.tsx` | Thống kê số sự kiện theo loại hình. |
| `/admin/users` | `scr/app/admin/users/page.tsx` | Danh sách người dùng được tổng hợp từ dữ liệu người tham gia. |

## Chi tiết `scr/components/`

| Tệp | Chức năng |
|---|---|
| `admin-layout.tsx` | Layout dùng chung cho khu vực quản trị, gồm sidebar và tiêu đề trang. |
| `event-card.tsx` | Thẻ tóm tắt sự kiện, gồm ảnh, trạng thái, thời gian, địa điểm và tiến độ đăng ký. |
| `event-form.tsx` | Form dùng chung cho chức năng tạo và chỉnh sửa sự kiện. |
| `ui.tsx` | Bộ component giao diện cơ bản: `Header`, `Footer`, `PageShell`, `SectionTitle`, `StatCard`, `Badge`, các trường form và `DataTable`. |

## Chi tiết `scr/lib/supabase-rest.ts`

Đây là lớp kết nối trung tâm giữa giao diện Next.js và Supabase. Tệp này chịu trách nhiệm:

- Khai báo kiểu dữ liệu: `EventRow`, `ParticipantRow`, `AssignmentRow`, `NotificationRow`, `NamedRow`.
- Gọi Supabase REST API để đọc danh sách khoa và loại sự kiện.
- Gọi PostgreSQL RPC để đọc hoặc thay đổi dữ liệu nghiệp vụ.
- Định dạng ngày giờ theo múi giờ Việt Nam.
- Cung cấp Server Actions cho form tạo, sửa, xóa sự kiện, đăng ký sinh viên, điểm danh, phân công và gửi thông báo.
- Làm mới cache route và chuyển hướng sau khi thao tác thành công.

Các RPC đang được mã nguồn sử dụng:

```text
app_get_events
app_get_participants
app_get_assignments
app_get_notifications
app_create_event
app_update_event
app_delete_event
app_register_student
app_check_in
app_create_assignment
app_create_notification
```

## Luồng dữ liệu chính

```text
Người dùng mở trang
    ↓
Next.js Server Component gọi hàm trong scr/lib/supabase-rest.ts
    ↓
Supabase REST API hoặc PostgreSQL RPC xử lý yêu cầu
    ↓
Dữ liệu được trả về và hiển thị qua component dùng chung

Người dùng gửi form
    ↓
Next.js Server Action trong scr/lib/supabase-rest.ts
    ↓
Supabase RPC cập nhật dữ liệu
    ↓
revalidatePath làm mới trang và redirect chuyển hướng người dùng
```

## Biến môi trường

Lớp Supabase hiện cần các biến sau:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
SUPABASE_APP_SECRET=your-app-secret
```

| Biến | Mục đích |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL REST API của dự án Supabase. |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Publishable key dùng để gửi yêu cầu đến Supabase. |
| `SUPABASE_APP_SECRET` | Secret được truyền vào các RPC nghiệp vụ của ứng dụng. |

Không đưa giá trị secret thật vào Git hoặc tài liệu công khai.

## Tài liệu đồ án trong `thesis/`

| Thư mục | Nội dung |
|---|---|
| `thesis/abs/` | Slide thuyết trình định dạng PowerPoint. |
| `thesis/doc/` | Báo cáo đồ án định dạng Word. |
| `thesis/pdf/` | Bản PDF của báo cáo và slide thuyết trình. |
| `thesis/poster/` | Poster đồ án và ảnh xem trước poster. |
| `thesis/refs/` | Sách, tiêu chuẩn và bài nghiên cứu dùng làm tài liệu tham khảo về hệ thống thông tin, RFID, điểm danh, bảo mật, RBAC, PostgreSQL và kiểm thử. |

## Trạng thái cấu hình hiện tại

Repository hiện chưa có các tệp cấu hình/chạy dự án thường gặp như `package.json`, `next.config.*`, `tsconfig.json`, `.env.example` và chưa có tệp thiết lập cơ sở dữ liệu trong `setup/`. Vì vậy, phần mã nguồn thể hiện đầy đủ bố cục và nghiệp vụ chính, nhưng cần bổ sung các tệp cấu hình cùng schema/RPC Supabase trước khi có thể cài dependency và chạy dự án độc lập.

## Quy ước khi mở rộng dự án

- Trang mới được đặt trong `scr/app/<route>/page.tsx`.
- API route mới được đặt trong `scr/app/<route>/route.ts`.
- Component dùng lại được đặt trong `scr/components/`.
- Hàm truy cập dữ liệu và Server Action được đặt trong `scr/lib/`.
- Tệp thiết lập cơ sở dữ liệu nên được đặt trong `setup/`.
- Tài liệu học thuật tiếp tục được phân loại trong `thesis/`.
