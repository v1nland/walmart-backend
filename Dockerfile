FROM node:12
WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE 27019
CMD [ "node", "index.js" ]
