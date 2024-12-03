# Stage 1: Build the React app
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:1.23
COPY --from=builder /app/dist /usr/share/nginx/html

ARG API_BASE_URL

EXPOSE 80
RUN envsubst '${API_BASE_URL}' < /usr/share/nginx/html/index.html > /usr/share/nginx/html/index.html.tmp && \
    mv /usr/share/nginx/html/index.html.tmp /usr/share/nginx/html/index.html
CMD ["nginx", "-g", "daemon off;"]