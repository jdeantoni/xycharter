const { InfluxDB } = require('@influxdata/influxdb-client')
const { Point } = require('@influxdata/influxdb-client')
const dataSetWriterSQL=  require('../toSQL/dataSetWriter')
var configInflux;

try{
    configInflux = require("../influxConfig.json");

    var token; var org; var bucket; var url; var client;

    if(Object.keys(configInflux).length > 0){

        token = configInflux.auth.token
        org = configInflux.org.name
        bucket = configInflux.bucket.name
        url = 'http://influx:8086'
        client = new InfluxDB({ url: url, token: token })

    }
} catch (error) {
    console.error("config de influx invalide")
}


const writeTimeSeries = async (name,id,timestamp,value) => {
    dataSetWriterSQL.modifyDataSet(id,name)
    const writeApi = client.getWriteApi(org, bucket)
    writeApi.useDefaultTags({ id: id })
    const point = new Point('point')
        .intField('value',value)
        .timestamp(new Date(parseInt(timestamp)*1000))
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