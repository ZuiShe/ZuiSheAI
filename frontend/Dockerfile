# ========== 第一阶段：构建 uni-app H5 ==========
FROM node:20-alpine AS builder

WORKDIR /build

# 先复制依赖文件，利用 Docker 缓存
COPY package.json ./
COPY vite.config.ts ./
COPY tsconfig.json ./
COPY index.html ./

# 安装依赖（npm install 会比较慢，1-3 分钟）
# 设置 npm 镜像为国内加速
RUN npm config set registry https://registry.npmmirror.com && \
    npm install --no-audit --no-fund

# 复制源码
COPY src ./src

# 构建 H5
RUN npm run build:h5

# ========== 第二阶段：nginx 服务静态文件 ==========
FROM nginx:1.27-alpine

# nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# uni-app H5 构建产物在 dist/build/h5
COPY --from=builder /build/dist/build/h5 /usr/share/nginx/html

# 权限
RUN chmod -R 755 /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]