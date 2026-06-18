FROM node:22.22.2-alpine

# Cài đặt các thư viện hệ thống cần thiết cho Strapi và thư viện xử lý ảnh (sharp)
RUN apk update && apk add --no-cache \
    build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev git

# Đặt thư mục làm việc để cài packages
WORKDIR /opt/

# Copy các file quản lý package. Dùng package-lock.json nếu có
COPY package.json ./
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Cài đặt package dependencies
RUN npm install && npm run build

# Đặt thư mục làm việc chính
WORKDIR /opt/app

# Copy toàn bộ mã nguồn
COPY . .

# Chèn đường dẫn bin của package vào PATH
ENV PATH /opt/node_modules/.bin:$PATH

# Phân quyền cho user mặc định 'node'
RUN chown -R node:node /opt/app
USER node

# Expose port cổng Strapi
EXPOSE 1337

# Lệnh khởi chạy server (dựa vào package.json là strapi develop)
CMD ["npm", "run", "production"]
