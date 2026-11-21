# Chuyển Tệp Mobile

Ứng dụng Capacitor (React + TypeScript) giao diện tiếng Việt cho Android và iOS.

## Trạng thái và giới hạn có chủ đích

- Các luồng chọn tệp, kiểm tra phần mở rộng, yêu cầu SOR gốc cho `PDF → SOR`, và hợp đồng gọi API đã có kiểm thử logic.
- Việc chuyển PDF/Word/Excel/DXF và tạo báo cáo SOR phải do dịch vụ đặt tại `VITE_CONVERTER_API_URL` thực hiện. Không cấu hình dịch vụ thì ứng dụng dừng với thông báo rõ ràng, không tạo kết quả giả.
- DWG và OCR chưa tích hợp. PDF quét/ảnh không được hứa hẹn trích xuất chính xác.
- PDF không thể sinh dữ liệu đo OTDR/SOR. Luồng `PDF → SOR` đòi PDF cùng tệp SOR gốc để backend xác minh và chỉ khôi phục tệp gốc đó.

## Phát triển

```powershell
npm install
npm run test
npm run build
npx cap add android
npx cap add ios
npm run cap:sync
```

Tạo `.env` với `VITE_CONVERTER_API_URL=https://may-chu-cua-ban` khi đã có backend. API `POST /convert` nhận multipart `file`, `conversion` và (với PDF → SOR) `originalSor`; trả JSON `{ base64, mimeType, fileName }`.

APK debug (sau khi cài Android SDK): `npm run android:debug`.

## Tạo APK bằng GitHub Actions

Workflow [`.github/workflows/android-debug.yml`](.github/workflows/android-debug.yml) chạy trên Ubuntu của GitHub, nên không cần Android SDK cục bộ. Đẩy thư mục này lên GitHub, mở **Actions → Tao APK Android debug → Run workflow**. Khi hoàn tất, tải artifact `chuyen-tep-debug-apk`; bên trong là `app-debug.apk` để cài thử trên Android.
