#!/bin/bash
cd ./Services
services_list=$(ls -d ./*/)
mapfile -t services_array <<< "$services_list"
cd ../

cd ./Services
for i in "${services_array[@]}"
do
    rm ./$i/.env
    cp ../.env ./$i/.env
done
cd ./xyCharterRender
cp ./.env ./src/main/resources/.env
mvn clean package
cd ../
cd ../

cd PostgreSQL
sh setup-postgres-config.sh
cd ../influxdb

docker build --tag influxdb .
docker run --publish 8086:8086 --detach --name influx influxdb 
sleep 10
sh ./setup-config.sh