docker build --tag influx .
docker run -p 8086:8086 --detach --name influx influx

#docker run -p 8086:8086   -u $(id -u):influxdb    -v influxdb:/var/lib/influxdb  influxdb:latest 
