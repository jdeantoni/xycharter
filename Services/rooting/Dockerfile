FROM node:16.3-alpine3.13


RUN npm install npm -g
RUN npm install pm2 -g

COPY . ./
COPY package.json .
COPY pm2.json .

# RUN apk --no-cache add curl
# RUN apk --no-cache add npm
# ADD https://www.npmjs.com/install.sh ./install.sh
# RUN sh install.sh

# RUN pm2 update
RUN npm install

COPY . ./

HEALTHCHECK  --interval=5s --timeout=3s \
    CMD wget --no-verbose --tries=1 --spider http://localhost:4000/ping || exit 1

CMD [ "pm2-runtime", "start", "pm2.json"]
