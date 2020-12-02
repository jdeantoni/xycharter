#!/bin/bash
cd ./Services
services_list=$(ls -d ./*/)
mapfile -t services_array <<< "$services_list"
cd ../

cd ./Services
for i in "${services_array[@]}"
do
    cd $i
    rm .env
    cp ../../.env ./.env
    cd ../
done
cd ../

cd PostgreSQL
sh setup-postgres-config.sh
cd ../influxdb
docker build --tag influxdb .
docker run --publish 8086:8086 --detach --name influx influxdb 
sleep 10
sh ./setup-config.sh