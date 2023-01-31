FROM nginx
RUN mkdir /app
COPY ./build /app
COPY deploy/nginx/nginx.conf /etc/nginx/nginx.conf

