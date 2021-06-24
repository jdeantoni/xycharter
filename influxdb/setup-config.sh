#!/bin/bash

## Create basic config in the db
touch influxConfig.json 

host="localhost"
port="8086"

POSITIONAL=()
while [[ $# -gt 0 ]]
do
key="$1"

case $key in
    -h|--host)
    host="$2"
    shift 
    shift 
    ;;
    -p|--port)
    port="$2"
    shift 
    shift 
    ;;
    *)    # unknown option
    shift # past argument
    ;;
esac
done

curl -H "Content-Type: application/json" --data @config.json "http://${host}:${port}/api/v2/setup"  > influxConfig.json

services_list=$(ls ../Services/)
mapfile -t services_array <<< "$services_list"

cd ../Services

for i in "${services_array[@]}"
do
    cd $i
    cp ../../influxdb/influxConfig.json ./
    cd ../
done
