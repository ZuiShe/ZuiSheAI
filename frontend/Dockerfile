# 前端镜像：uni-app H5 静态站点
# 当前为占位版（让你先把架构跑通），真实 uni-app 代码到位后
# 把代码 COPY 进 /app，执行 npm run build:h5，把产物复制到 nginx 目录即可。

FROM nginx:1.27-alpine

# 用一份简单的占位首页（保证服务能起、能验证 HTTPS）
COPY index.html /usr/share/nginx/html/index.html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 强制保证静态文件可读（nginx worker 用户是 nginx）
RUN chmod -R 644 /usr/share/nginx/html/ && \
    chmod 755 /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]