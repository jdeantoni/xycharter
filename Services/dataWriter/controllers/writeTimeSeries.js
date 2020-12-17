const { InfluxDB } = require('@influxdata/influxdb-client')
const { Point } = require('@influxdata/influxdb-client')
const dataSetWriterSQL = require('../toSQL/dataSetWriter')
var configInflux;
const dotenv = require('dotenv');
dotenv.config()
try { //Initialisation of the influx parameters
    configInflux = require("../influxConfig.json");

    var token; var org; var bucket; var url; var client;

    if (Object.keys(configInflux).length > 0) {

        token = configInflux.auth.token
        org = configInflux.org.name
        bucket = configInflux.bucket.name
        url = process.env.INFLUX_ADDR
        client = new InfluxDB({ url: url, token: token })

    }
} catch (error) {
    console.error("config de influx invalide")
}


const writeTimeSeries = async (name, id, timestamp, value) => { //Write the value to the influxDB
    dataSetWriterSQL.modifyDataSet(id, name)
    const writeApi = client.getWriteApi(org, bucket)
    writeApi.useDefaultTags({ id: id })
    var point = undefined;
    if (typeof (value) === "boolean") {
        point = new Point('pointBoolean')
            .booleanField('value', value)
            .timestamp(new Date(parseInt(timestamp) * 1000))

    } else {

        point = new Point('point')
            .intField('value', value)
            .timestamp(new Date(parseInt(timestamp) * 1000))

    }
    writeApi.writePoint(point)

    writeApi
        .close()
        .catch(e => {
            throw new Error(e)
        })
}

module.exports = {
    writeTimeSeries
}