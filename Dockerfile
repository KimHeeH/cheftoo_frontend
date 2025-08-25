#React 앱 빌드
FROM node:20 AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

#Nginx로 정적 파일 서빙
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
