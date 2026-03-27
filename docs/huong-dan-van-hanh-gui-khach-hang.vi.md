# Hướng Dẫn Admin Sử Dụng Website

Tài liệu này giúp admin hiểu website dùng để làm gì và cần thao tác gì trong trang quản trị.

## 1) Website này dùng để làm gì?

- Giới thiệu thương hiệu và năng lực của doanh nghiệp.
- Trưng bày sản phẩm và dịch vụ cho khách hàng tham khảo.
- Hỗ trợ khách gửi nhu cầu tư vấn/mua hàng qua trang liên hệ.
- Hỗ trợ đội admin cập nhật nội dung nhanh qua trang quản trị.

Website public: [https://bitzer-e-commerce.vercel.app/](https://bitzer-e-commerce.vercel.app/)

## 2) Admin truy cập ở đâu?

- Trang đăng nhập quản trị: `/admin-login`
- Đăng nhập bằng tài khoản đã được cấp.
- Sau khi đăng nhập thành công, hệ thống vào trang `/admin`.

## 3) Admin cần làm gì trong hệ thống?

Admin tập trung vào 3 nhóm nội dung chính:

- Quản lý **Sản phẩm**
- Quản lý **Danh mục**
- Quản lý **Dịch vụ**

Ngoài ra có trang **Tổng quan** để xem số liệu nhanh.

## 4) Chức năng từng trang quản trị

## 4.1 Trang Tổng quan (`/admin`)

- Xem nhanh số lượng:
  - Tổng sản phẩm
  - Tổng danh mục
  - Tổng dịch vụ
  - Sản phẩm hết hàng
- Mở nhanh các màn hình quản lý.

## 4.2 Trang Sản phẩm (`/admin/products`)

### Admin làm được gì?

- Thêm sản phẩm mới
- Sửa thông tin sản phẩm
- Xóa sản phẩm
- Tìm kiếm sản phẩm theo tên/slug
- Xem danh sách theo phân trang

### Khi tạo/cập nhật sản phẩm cần nhập

- Tên sản phẩm
- Giá và tồn kho
- Danh mục
- Ảnh sản phẩm (URL)
- Mô tả ngắn, mô tả chi tiết
- Thông số kỹ thuật

Ghi chú:

- Ảnh đầu tiên là ảnh đại diện.
- Hệ thống có hỗ trợ nội dung tiếng Việt và tiếng Anh.

## 4.3 Trang Danh mục (`/admin/categories`)

### Admin làm được gì?

- Thêm danh mục
- Xóa danh mục

Ghi chú:

- Danh mục chỉ xóa được khi không còn sản phẩm nào thuộc danh mục đó.

## 4.4 Trang Dịch vụ (`/admin/services`)

### Admin làm được gì?

- Thêm dịch vụ
- Sửa dịch vụ
- Xóa dịch vụ

### Khi tạo/cập nhật dịch vụ cần nhập

- Tên dịch vụ
- Ảnh thumbnail và ảnh mô tả
- Mô tả ngắn
- Mô tả chi tiết
- Các điểm nổi bật (features)

## 5) Nội dung website public hiển thị từ đâu?

- Dữ liệu hiển thị trên website public lấy từ các thông tin admin đã cập nhật trong trang quản trị.
- Khi admin cập nhật sản phẩm/dịch vụ/danh mục, nội dung trên website sẽ được cập nhật theo.

## 6) Khách hàng xem gì trên website public?

- **Trang chủ:** giới thiệu doanh nghiệp và điều hướng nhanh.
- **Sản phẩm:** danh sách sản phẩm để tìm kiếm/lọc.
- **Chi tiết sản phẩm:** xem thông tin đầy đủ, thêm giỏ hàng, gửi yêu cầu tư vấn.
- **Dịch vụ:** danh sách dịch vụ.
- **Chi tiết dịch vụ:** thông tin dịch vụ và nút đăng ký tư vấn.
- **Giỏ hàng:** tổng hợp sản phẩm đã chọn.
- **Liên hệ:** gửi thông tin để doanh nghiệp liên hệ lại.
- **Giới thiệu:** thông tin về công ty và năng lực.

## 7) Lưu ý ngắn cho admin

- Nhập nội dung rõ ràng, đúng chính tả.
- Dùng URL ảnh hợp lệ để tránh lỗi hiển thị.
- Kiểm tra lại trước khi xóa vì thao tác xóa không hoàn tác trên giao diện.

