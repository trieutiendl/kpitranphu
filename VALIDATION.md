# Xác thực

## Đã kiểm thử logic

- Chấp nhận/từ chối phần mở rộng theo từng luồng chuyển đổi.
- Sinh tên tệp đầu ra.
- Chặn PDF → SOR nếu không có tệp SOR gốc phụ trợ.

## Cần kiểm thử thiết bị

- Android: mở bộ chọn tệp, gửi tệp đến API, gọi hộp lưu/chia sẻ Capacitor.
- iOS/Xcode: quyền truy cập tệp, trình chia sẻ hệ thống và cấu hình signing.

## Chưa hoàn tất

- Chưa có Android SDK hoặc Xcode trong môi trường hiện tại nên chưa tạo APK/chạy thiết bị.
- Chưa có URL dịch vụ chuyển đổi; không xác nhận chất lượng chuyển đổi nội dung cho đến khi tích hợp backend.
- `npm install` hiện lỗi `ENOENT` khi giải nén vào thư mục OneDrive đồng bộ, nên chưa chạy được Vitest/Vite tại chỗ. Cần thử lại ở thư mục không được OneDrive đồng bộ hoặc sau khi dừng đồng bộ thư mục dự án.
