#!/bin/bash
mag=$'\e[1;35m'
grn=$'\e[1;32m'
blu=$'\e[1;34m'
end=$'\e[0m'

parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )

cd $parent_path/"Services"

declare -a name_container=("data-writer" "graph-writer" "database-reader" "xycharter-render" "quickchart-render" "render" "rooting")

for name in "${name_container[@]}"
do
    printf "${mag}Healtcheck containers : ${end} ${blu}${name}${end} "
    res=`docker inspect -f {{.State.Health.Status}} ${name}`
    ip=`docker inspect -f {{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}} ${name}` 
    printf "$ip "
    while [ "$res" != "healthy" ]; do
        sleep 0.5;
        printf "${grn}.${end}"
        res=`docker inspect -f {{.State.Health.Status}} ${name}`
    done;
    printf "${grn}READY${end}  \n"
done

printf "${grn}All containers are ready${end}\n"