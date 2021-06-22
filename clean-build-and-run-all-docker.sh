sh stop-and-remove-all-docker.sh

sh setup-config-before-run.sh


echo "#### CONFIGURE AND RUN Influxdb  ####"
cd influxdb
sh runInfluxDocker.sh

sleep 20

sh setup-config.sh

cd ..

echo "### DOCKER COMPOSE START ###"


docker-compose build
docker-compose up &


sleep 40
#helthcheck does not work, TODO: investigate why
#sh healthcheck.sh

echo "### DOCKER COMPOSE END ###"

docker network connect xycharter_default influx
