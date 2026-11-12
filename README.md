# ShopMini - Bài tập thực hành 03 (TH02)

Ứng dụng cửa hàng mini xây dựng bằng React + TypeScript (Vite), kết hợp quản lý state bằng Local State (`useState`), Context API và Redux Toolkit.

## Phân chia quản lý dữ liệu (State Management) và Lý do

### 1. Dữ liệu lưu ở `useState` (Local Component State)
- **Từ khoá tìm kiếm sản phẩm (`searchTerm`)** tại `HomePage.tsx`.
- **Dữ liệu nhập form đăng nhập (`username`, `password`, `error`)** tại `LoginPage.tsx`.
- **Trạng thái thông báo đặt hàng thành công (`orderSuccess`)** tại `CheckoutPage.tsx`.
- **Lý do:** Đây là các trạng thái cục bộ, chỉ phục vụ hiển thị hoặc tương tác bên trong một trang/component duy nhất, không cần chia sẻ cho các component khác nên dùng `useState` giúp code gọn nhẹ và tránh re-render toàn cục.

### 2. Dữ liệu lưu ở `Context API`
- **`ThemeContext` (`theme` sáng/tối, `toggleTheme`):** Được sử dụng ở nhiều tầng giao diện (`MainLayout`, `Header`, `ProductCard`, các trang) nhưng tần suất thay đổi thấp và logic đơn giản.
- **`AuthContext` (`user`, `login`, `logout`):** Thông tin phiên đăng nhập của người dùng cần truy cập xuyên suốt ở `Header`, `ProtectedRoute`, `LoginPage` và `CheckoutPage`.
- **Lý do:** Context API rất phù hợp cho dữ liệu mang tính cấu hình toàn cục hoặc xác thực người dùng có tần suất cập nhật thấp, giúp truyền dữ liệu qua cây component mà không bị prop drilling.

### 3. Dữ liệu lưu ở `Redux Toolkit`
- **`productsSlice` (`items`, `status`, `error`):** Quản lý dữ liệu bất đồng bộ từ API (`createAsyncThunk`) và các trạng thái `loading`, `succeeded`, `failed`, được chia sẻ giữa trang chủ và trang chi tiết sản phẩm.
- **`cartSlice` (`items` cùng các action `addToCart`, `removeFromCart`, `updateQuantity`, `clearCart` và các selector tính tổng số lượng, tổng tiền):**
- **Lý do:** Giỏ hàng và danh sách sản phẩm có logic cập nhật phức tạp, thay đổi thường xuyên từ nhiều nơi (`ProductCard`, `ProductDetailPage`, `CartPage`, `CheckoutPage`, `Header`) và cần xử lý bất đồng bộ cũng như tính toán dữ liệu phái sinh qua selector.
