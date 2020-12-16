FROM alpine:3.7

# Installing packages
RUN apk add --no-cache su-exec

# Work path
WORKDIR /scripts


# Coping scripts
COPY  ./scripts/start.sh start.sh
RUN sed -i.bak 's/\r$//' start.sh

# Downloading binaries
ADD https://dl.influxdata.com/influxdb/releases/influxdb-2.0.2_linux_amd64.tar.gz ./
RUN addgroup influxdb && \
        adduser -s /bin/false -G influxdb -S -D influxdb

# Installing binaries
RUN tar -C . -xzf influxdb-2.0.2_linux_amd64.tar.gz && \
        chmod +x influxdb-*/* && \
        cp -a influxdb-*/* /usr/bin/ && \
        rm -rf *.tar.gz* influxdb-*/

VOLUME [ "/var/lib/influxdb" ] 

EXPOSE 8086

HEALTHCHECK  --interval=5s --timeout=3s \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8086/health || exit 1

ENTRYPOINT [ "./start.sh" ]