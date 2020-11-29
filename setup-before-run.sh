cd PostgreSQL
sh setup-postgres-config.sh
cd ../influxdb
docker build --tag influxdb .
docker run --publish 8086:8086 --detach --name influx influxdb 
sleep 10
sh ./setup-config.sh