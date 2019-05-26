FROM node:11
WORKDIR /srv/daylogs
ADD package* /srv/daylogs/
RUN npm install
ADD . .
RUN npm run build --dest=dist
RUN ls

FROM nginx:latest
WORKDIR /var/www/daylogs
COPY --from=0 /srv/daylogs/dist/. .
COPY api-endpoint.conf /etc/nginx/conf.d/.