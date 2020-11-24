FROM alpine:3.7

# Installing packages
RUN apk add --no-cache su-exec

# Work path
WORKDIR /scripts

# Downloading binaries
ADD https://dl.influxdata.com/influxdb/releases/influxdb-2.0.2_linux_amd64.tar.gz ./
RUN addgroup influxdb && \
        adduser -s /bin/false -G influxdb -S -D influxdb

# Coping scripts
COPY ./start.sh start.sh

# Installing binaries
RUN tar -C . -xzf influxdb-2.0.2_linux_amd64.tar.gz && \
        chmod +x influxdb-*/* && \
        cp -a influxdb-*/* /usr/bin/ && \
        rm -rf *.tar.gz* influxdb-*/

VOLUME [ "/var/lib/influxdb" ] 

EXPOSE 8086

ENTRYPOINT [ "./start.sh" ]