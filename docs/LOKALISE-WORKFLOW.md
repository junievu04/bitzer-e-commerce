# Workflow Lokalise – Sync dịch 2 chiều

## Tổng quan

- **Lokalise** hỗ trợ JSON (flat). Project dùng `languages/en.json`, `languages/vi.json`.
- **sync-keys**: Tự động quét `t("key")` trong code và thêm key mới vào JSON (nếu chưa có).
- **GitHub Actions**: Push lên Lokalise khi push `main`; Pull tạo PR khi cập nhật trên Lokalise.

## Thiết lập ban đầu

### 1. Tạo project trên Lokalise

1. Tạo project "Web and mobile" trên [Lokalise](https://lokalise.com)
2. **Base language**: Vietnamese (Vietnam) (`vi_VN`) – ngôn ngữ gốc (cột in đậm)
3. Thêm ngôn ngữ: English (`en`) – ngôn ngữ dịch
4. Lấy **Project ID** trong Settings → General

### 2. API Token

1. Lokalise → Settings → API tokens
2. Tạo token với quyền **Read & Write**
3. Lưu token (chỉ hiển thị 1 lần)

### 3. Cấu hình GitHub

1. Repo → Settings → Secrets and variables → Actions
2. **Secrets**: thêm `LOKALISE_API_TOKEN`
3. **Variables**: thêm `LOKALISE_PROJECT_ID`

## Luồng làm việc

### Thêm key mới (Code → Lokalise)

1. Dùng `t("key")` trong code:
   ```tsx
   const { t } = useIntl();
   t("form.email.placeholder");
   ```

2. Chạy sync (hoặc để CI làm):
   ```bash
   npm run sync-keys
   ```
   → Thêm key mới vào `languages/en.json` và `languages/vi.json` (giá trị mặc định = key)

3. Commit và push lên `main`:
   ```bash
   git add .
   git commit -m "feat: add new translation key"
   git push origin main
   ```

4. Workflow **Push to Lokalise** chạy tự động → key mới xuất hiện trên Lokalise.

### Cập nhật bản dịch (Lokalise → Code)

1. Dịch/cập nhật trên Lokalise
2. **Tự động (webhook)**: Workflow Pull chạy ngay → tạo PR
3. **Thủ công**: Actions → **Pull from Lokalise** → Run workflow
4. Merge PR → code dùng bản dịch mới

### Webhook – Pull tự động khi Lokalise cập nhật

1. **GitHub PAT** (Personal Access Token):
   - GitHub → Settings → Developer settings → Personal access tokens
   - Tạo token với scope `repo`
   - Lưu token

2. **Env vars** (Vercel / hosting):
   - `GITHUB_REPOSITORY`: `owner/repo` (vd: `yourname/bitzer-e-commerce`)
   - `GITHUB_WEBHOOK_PAT`: PAT vừa tạo
   - `LOKALISE_WEBHOOK_SECRET`: chuỗi bí mật bất kỳ (dùng để verify webhook)

3. **Lokalise webhook**:
   - Lokalise → Apps → Webhooks → Enable
   - **URL**: `https://your-domain.com/api/webhooks/lokalise`
   - **Events**: chọn `project.translation.updated`
   - **X-Secret**: cùng giá trị với `LOKALISE_WEBHOOK_SECRET`
   - Save

## Cấu trúc file

| File | Nguồn |
|------|-------|
| `languages/en.json` | sync-keys (từ `t()` trong code) + Lokalise Pull |
| `languages/vi.json` | sync-keys (từ `t()` trong code) + Lokalise Pull |

## Lưu ý

- **`t("key")`**: Key mới được thêm tự động khi chạy `npm run sync-keys` (hoặc khi push lên main).
- **`t("key", { defaultMessage: "Fallback" })**: Nếu thiếu key, dùng `defaultMessage`.
- Không chỉnh sửa trực tiếp `languages/*.json` nếu đã dùng Lokalise – có thể bị ghi đè khi Pull.

## Xử lý lỗi: vi có English, en có Vietnamese (lộn bản dịch)

1. **Kiểm tra Lokalise**: Settings → Languages → Base language phải là **Vietnamese (vi)**.
2. **Khi dịch**: Chọn đúng cột (vi = nguồn, en = bản dịch).
3. **Pull workflow** đã có `language_mapping` để map `vi_VN` → `vi`, `en_US` → `en`.
4. Nếu vẫn lộn: Xóa key trên Lokalise, push lại từ GitHub, rồi dịch lại.
