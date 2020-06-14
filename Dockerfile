FROM node:14.4.0-alpine3.10

RUN npm install -g firebase-tools;

WORKDIR /var/www/html
