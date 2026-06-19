# --- Build stage (Angular static build) ---
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# --- Runtime stage (nginx serves the static site + proxies /api) ---
FROM nginx:1.27-alpine AS runtime
COPY --from=build /app/dist/FrontEnd/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
