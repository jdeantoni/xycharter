docker-compose build
docker-compose up &
sh healthcheck.sh
docker network connect ter-xycharter_default influx