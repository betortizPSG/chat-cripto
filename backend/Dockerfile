FROM node:16.7.0

WORKDIR /usr/src/app
COPY ./package*.json ./


RUN npm install 
COPY ./. .
WORKDIR /usr/src/app/dist

EXPOSE 5000 8000
CMD [ "node", "/usr/src/app/server.js" ]