const { InfluxDB } = require('@influxdata/influxdb-client')
const configInflux = require("../../../influxdb/config.json")
const { Point } = require('@influxdata/influxdb-client')

var token; var org; var bucket; var url; var client;

if(Object.keys(configInflux).length > 0){

    token = configInflux.auth.token
    org = configInflux.org.name
    bucket = configInflux.bucket.name
    url = 'http://localhost:8086'
    client = new InfluxDB({ url: url, token: token })

}




const writeTimeSeries = async (id, pt) => {
    
    const writeApi = client.getWriteApi(org, bucket)
    writeApi.useDefaultTags({ id: id })
    const point = new Point('point')
        .intField('x', pt.x)
        .intField("y", pt.y)
        .timestamp(new Date())
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