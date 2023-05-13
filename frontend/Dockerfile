FROM node:16.7.0 as build-stage
WORKDIR /app
COPY ./package*.json /app/
RUN npm install
COPY ./ /app/
ARG PORT=80
ENV REACT_APP_SOCKET __REACT_APP_SOCKET__
ENV REACT_APP_API __REACT_APP_API__
RUN npm run build
FROM nginx:1.16.0-alpine
COPY --from=build-stage /app/build/ /usr/share/nginx/html
#COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/start.sh /
RUN chmod ugo+rx /start.sh
EXPOSE 80

CMD ["/start.sh"]

