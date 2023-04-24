FROM node:16 as builder
WORKDIR /super-home
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm@7.14.2
COPY package.json ./
COPY pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod
COPY . ./
RUN touch .env
COPY ./docker/.env-front ./.env
RUN pnpm run build


# Bundle static assets with nginx
FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /super-home/dist /usr/share/nginx/html
COPY ./docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]