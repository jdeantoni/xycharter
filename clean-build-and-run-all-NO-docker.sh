#!/bin/bash

kill=0
db=0

for param in "$@"
do
    #Si on souhaite kill les serveur a la fin
    if [ $param = "-k" ]
    then
        kill=1
    fi
done

#echo "Installation of pm2"
#npm install -g pm2

echo "#### CONFIGURE AND RUN Influxdb  ####"
docker stop influx
docker rm influx
cd influxdb
sh runInfluxDocker.sh

sleep 20

sh setup-config.sh

cd ..



pm2 stop all
pm2 delete all
sh cleanNodeStuff.sh


cd ./Services
services_list=$(ls -d ./*/)
mapfile -t services_array <<< "$services_list"
cd ../

echo services_list

cd ./Services

for i in "${services_array[@]}"
do
    rm $i./postgreConfig.json
    cp ../PostgreSQL/postgreConfig.json $i./postgreConfig.json
done


for i in "${services_array[@]}"
do
    echo "-----------------------"
    echo $i
    cd $i
    rm .env
    cp ../../dev.env ./.env
    npm install
    ##npm test
    #pm2 start server.js -n $i
    if [ -f pm2.json ]
    then 
        pm2 start pm2.json
    fi
    cd ../
done




echo "-----------------------"


cd ../
cd front-end
cp ../dev.env ./.env
npm install 
pm2 start pm2.json
cd ..


echo "-----------------------"
cd ./Services
echo XYCharter render
cd ./xyCharterRenderer
#export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-11.0.9.11-0.fc32.x86_64
cp ../../dev.env ./src/main/resources/.env
mvn clean package -DskipTests
mvn spring-boot:run


echo "All services launch successfully"

if [ $kill = 1 ]
then
    echo "Kill des serveurs"
    pm2 kill
fi
