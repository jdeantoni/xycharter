const { InfluxDB } = require('@influxdata/influxdb-client')
const configInflux = require("../../../influxdb/config.json")
const { Point } = require('@influxdata/influxdb-client')

const token = configInflux.auth.token
const org = configInflux.org.name
const bucket = configInflux.bucket.name
const url = 'http://localhost:8086'
const client = new InfluxDB({ url: url, token: token })



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