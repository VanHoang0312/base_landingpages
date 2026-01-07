FROM node:18 AS build-step
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install  --legacy-peer-deps 
RUN npm install @rollup/rollup-linux-x64-gnu --save-optional
RUN npm install @swc/core-linux-x64-gnu --save-optional
COPY . .
RUN npm run build

FROM nginx:1.18.0-alpine
RUN apk update && apk add tzdata
ENV TZ=Asia/Ho_Chi_Minh
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-step /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 80