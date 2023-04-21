FROM nginx
RUN mkdir /app
COPY ./build /app
COPY deploy/nginx/nginx.conf /etc/nginx/nginx.conf
COPY /etc/letsencrypt/live/wxwind.top /etc/letsencrypt/live/wxwind.top
