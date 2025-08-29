FROM node:lts-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.24.0 as production
WORKDIR /var/www/html
COPY docker/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
COPY --from=builder --chown=www-data /app/dist .
