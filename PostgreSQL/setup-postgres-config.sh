#!/bin/bash
services_list=$(ls ../Services/)
mapfile -t services_array <<< "$services_list"

cd ../Services

for i in "${services_array[@]}"
do
    cd $i
    cp ../../PostgreSQL/postgreConfig.json ./
    cd ../
done
