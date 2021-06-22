#!/bin/bash
mag=$'\e[1;35m'
grn=$'\e[1;32m'
blu=$'\e[1;34m'
end=$'\e[0m'


echo "using this env file: ../.env"

cd front-end
cp ../.env ./.env
cd ..
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
cd ./xyCharterRenderer
cp ../../.env ./.env
cp ../../.env ./src/main/resources/.env
mvn clean package -DskipTests
cd ../
cd ../

cd PostgreSQL
sh setup-postgres-config.sh

# cd ../influxdb
# docker build --tag influxdb .
# docker stop influx
# docker rm influx
# docker run --publish 8086:8086 --detach --name influx influxdb 
# name_container_influx="influx"
# printf "${mag}Healtcheck containers : ${end} ${blu}${name_container_influx}${end} "
# res=`docker inspect -f {{.State.Health.Status}} ${name_container_influx}`
# ip=`docker inspect -f {{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}} ${name_container_influx}` 
# printf "$ip "
# # while [ "$res" != "healthy" ]; do
#     sleep 10.5;
#     printf "${grn}.${end}"
# #     res=`docker inspect -f {{.State.Health.Status}} ${name_container_influx}`
# #done;
# printf "${grn}READY${end}  \n"
# sh ./setup-config.sh
