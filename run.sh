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

echo "Installation of pm2"
npm install -g pm2
cd ./Services
services_list=$(ls -d ./*/)
mapfile -t services_array <<< "$services_list"
cd ../

echo services_list

cd ./Services

for i in "${services_array[@]}"
do
    rm $i./postgreConfig.json
    cp ../PostgreSQL/postgreConfigLocal.json $i./postgreConfig.json
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
    pm2 start server.js -n $i
    cd ../
done

echo "-----------------------"
echo XYCharter render
cd ./XYCharterRender
export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-11.0.9.11-0.fc32.x86_64
mvn clean package
mvn spring-boot:run


cd ../

echo "All services launch successfully"

if [ $kill = 1 ]
then
    echo "Kill des serveurs"
    pm2 kill
fi