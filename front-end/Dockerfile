FROM keymetrics/pm2:15-alpine

COPY . ./
COPY package.json .
COPY pm2.json .

RUN npm install

COPY . ./

HEALTHCHECK  --interval=5s --timeout=3s \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080 || exit 1

CMD [ "pm2-runtime", "start", "pm2.json"]
