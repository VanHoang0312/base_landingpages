FROM node:18-alpine AS build-step
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run build

FROM nginx:1.18.0-alpine
RUN apk update && apk add tzdata
ENV TZ=Asia/Ho_Chi_Minh
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-step /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 80