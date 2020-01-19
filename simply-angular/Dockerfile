FROM node:12.5.0
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm cache clean --force
RUN npm install
COPY . /usr/src/app
RUN npm run build
EXPOSE 8080
CMD ["npm", "run", "server:build"]