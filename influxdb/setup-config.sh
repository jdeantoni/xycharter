#!/bin/sh

## Create basic config in the db
touch influxConfig.json 

curl --request POST 'http://localhost:8086/api/v2/setup' \
     --data '{
                "username": "admin",
                "password": "root123456",
                "org": "data-org",
                "bucket": "datagraph",
                "retentionPeriodHrs": 0
                }' \
    > influxConfig.json

services_list=$(ls ../Services/)
mapfile -t services_array <<< "$services_list"

cd ../Services

for i in "${services_array[@]}"
do
    cd $i
    cp ../../influxdb/influxConfig.json ./
    cd ../
done