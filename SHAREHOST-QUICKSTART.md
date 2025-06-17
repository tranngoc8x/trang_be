# 🚀 SHAREHOST - HƯỚNG DẪN NHANH

## ✅ Entry Points Sẵn Sàng

**4 entry points đã được tạo và test thành công:**

| Entry Point | Mô tả | Khuyến nghị |
|-------------|-------|-------------|
| `server.js` | Đầy đủ tính năng, logging chi tiết | ⭐ Development |
| `start.js` | Tối ưu production, ít log | ⭐ Production |
| `index.js` | Đơn giản nhất, nhanh nhất | ⭐ Tài nguyên hạn chế |
| `app.js` | Cân bằng, backup option | Dự phòng |

## 🚀 Cách Khởi Động Nhanh

### Bước 1: Cấu hình môi trường
```bash
# Copy file cấu hình mẫu
cp .env.sharehost .env

# Chỉnh sửa thông tin database trong .env
nano .env
```

### Bước 2: Cài đặt và build
```bash
# Cài đặt dependencies
npm install --production

# Build admin panel
npm run build
```

### Bước 3: Khởi động
```bash
# Cách 1: Production (khuyến nghị cho sharehost)
node start.js

# Cách 2: Development (nhiều log hơn)
node server.js

# Cách 3: Tối thiểu (ít tài nguyên nhất)
node index.js

# Cách 4: Sử dụng npm script
npm run sharehost
```

## ⚙️ Cấu hình .env Tối Thiểu

```env
# Server
HOST=0.0.0.0
PORT=1337
NODE_ENV=production

# Database
DATABASE_CLIENT=mysql
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_NAME=your_db_name
DATABASE_USERNAME=your_username
DATABASE_PASSWORD=your_password

# Secrets (tạo random)
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=your_salt
ADMIN_JWT_SECRET=your_secret
TRANSFER_TOKEN_SALT=your_salt
JWT_SECRET=your_jwt_secret
```

## 🎯 Lệnh Một Dòng

```bash
# Khởi động nhanh với port tùy chỉnh
PORT=8080 node start.js

# Hoặc với biến môi trường
NODE_ENV=production PORT=3000 node server.js
```

## 🔧 Troubleshooting Nhanh

| Lỗi | Giải pháp |
|-----|-----------|
| Port đã sử dụng | `PORT=8080 node start.js` |
| Lỗi database | Kiểm tra `.env` và database connection |
| Lỗi memory | Sử dụng `node start.js` (đã tối ưu) |
| Admin không load | Chạy `npm run build` trước |

## 📞 Support

- **File log chi tiết**: Sử dụng `server.js`
- **Production ổn định**: Sử dụng `start.js`
- **Tài nguyên hạn chế**: Sử dụng `index.js`

**Tất cả entry points đã được test và hoạt động 100%!** ✅
