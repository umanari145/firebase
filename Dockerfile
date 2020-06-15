FROM node:14.4.0-alpine3.10

RUN npm install -g firebase-tools;
RUN npm install -g http-server;
RUN npm install -g vue-cli;

WORKDIR /var/www/html
