# Hướng dẫn Deploy trên Sharehost

## ✅ Entry Points đã tạo và kiểm tra thành công

Dự án này có 4 entry point khác nhau để phù hợp với các yêu cầu khác nhau của sharehost:

**🎯 Tất cả entry points đã được test và hoạt động tốt!**

### 1. `server.js` (Khuyến nghị)
- Entry point chính với đầy đủ tính năng
- Có logging chi tiết và xử lý lỗi
- Cấu hình môi trường tự động
- Xử lý tín hiệu tắt ứng dụng

**Cách sử dụng:**
```bash
node server.js
# hoặc
npm run serve
# hoặc
npm run sharehost
```

### 2. `app.js` (Thay thế)
- Entry point đơn giản hơn
- Sử dụng API Strapi trực tiếp
- Ít logging hơn

**Cách sử dụng:**
```bash
node app.js
# hoặc
npm run app
```

### 3. `start.js` (Production)
- Tối ưu hóa cho production
- Tắt các log không cần thiết
- Cấu hình memory tối ưu

**Cách sử dụng:**
```bash
node start.js
# hoặc
npm run production
```

### 4. `index.js` (Tối thiểu)
- Entry point đơn giản nhất
- Chỉ khởi động Strapi cơ bản

**Cách sử dụng:**
```bash
node index.js
```

## Cấu hình môi trường

Tạo file `.env` với các biến sau:

```env
# Server Configuration
HOST=0.0.0.0
PORT=1337
NODE_ENV=production

# Database Configuration (MySQL)
DATABASE_CLIENT=mysql
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_NAME=your_database_name
DATABASE_USERNAME=your_username
DATABASE_PASSWORD=your_password

# Strapi Secrets (Tạo random strings)
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=your_api_token_salt
ADMIN_JWT_SECRET=your_admin_jwt_secret
TRANSFER_TOKEN_SALT=your_transfer_token_salt
JWT_SECRET=your_jwt_secret
```

## Yêu cầu hệ thống

- **Node.js**: >= 18.0.0 (khuyến nghị 20.9.0)
- **Database**: MySQL 8.0+ hoặc PostgreSQL 12+
- **Memory**: Tối thiểu 512MB RAM
- **Storage**: Tối thiểu 1GB dung lượng

## Cài đặt trên Sharehost

### Bước 1: Upload code
```bash
# Nén toàn bộ dự án (trừ node_modules)
zip -r trang-backend.zip . -x "node_modules/*" ".git/*"
```

### Bước 2: Cài đặt dependencies
```bash
npm install --production
# hoặc
yarn install --production
```

### Bước 3: Build ứng dụng
```bash
npm run build
```

### Bước 4: Khởi động
```bash
# Sử dụng entry point chính
node server.js

# Hoặc sử dụng npm script
npm run sharehost
```

## Troubleshooting

### Lỗi kết nối database
- Kiểm tra thông tin database trong `.env`
- Đảm bảo database đã được tạo
- Kiểm tra quyền truy cập database

### Lỗi port đã được sử dụng
- Thay đổi PORT trong `.env`
- Hoặc sử dụng: `PORT=8080 node server.js`

### Lỗi memory
- Tăng memory limit: `NODE_OPTIONS="--max-old-space-size=1024" node server.js`
- Sử dụng `start.js` cho production

### Lỗi permissions
- Đảm bảo các file có quyền thực thi: `chmod +x *.js`
- Kiểm tra quyền ghi thư mục uploads

## Monitoring

Ứng dụng sẽ log thông tin khởi động và lỗi. Để theo dõi:

```bash
# Chạy với log output
node server.js > app.log 2>&1 &

# Xem log
tail -f app.log
```

## Support

Nếu gặp vấn đề, kiểm tra:
1. File `.env` có đúng cấu hình không
2. Database có kết nối được không
3. Port có bị chiếm không
4. Memory có đủ không

Entry point `server.js` sẽ cung cấp thông tin debug chi tiết nhất.

## ✅ Kết quả Test

**Tất cả entry points đã được test thành công:**

### ✅ `server.js` - HOẠT ĐỘNG TỐT
- ✅ Khởi động thành công
- ✅ Logging chi tiết
- ✅ Xử lý lỗi tốt
- ✅ Admin panel hoạt động
- ✅ API endpoints hoạt động

### ✅ `start.js` - HOẠT ĐỘNG TỐT (Production)
- ✅ Khởi động nhanh trong production mode
- ✅ Tối ưu memory
- ✅ Admin panel hoạt động hoàn hảo
- ✅ Phù hợp cho sharehost production

### ✅ `app.js` - HOẠT ĐỘNG TỐT
- ✅ Khởi động ổn định
- ✅ Logging vừa phải
- ✅ Admin panel hoạt động
- ✅ Phù hợp làm backup entry point

### ✅ `index.js` - HOẠT ĐỘNG TỐT (Đơn giản nhất)
- ✅ Khởi động nhanh nhất
- ✅ Ít log nhất
- ✅ Admin panel hoạt động hoàn hảo
- ✅ Phù hợp cho sharehost với tài nguyên hạn chế

## 🎯 Khuyến nghị cho Sharehost

**Thứ tự ưu tiên sử dụng:**

1. **`server.js`** - Tốt nhất cho debug và development
2. **`start.js`** - Tốt nhất cho production
3. **`index.js`** - Tốt nhất cho tài nguyên hạn chế
4. **`app.js`** - Backup option

**Lệnh khởi động được khuyến nghị:**
```bash
# Cho sharehost production
node start.js

# Hoặc nếu cần debug
node server.js

# Hoặc nếu tài nguyên hạn chế
node index.js
```
