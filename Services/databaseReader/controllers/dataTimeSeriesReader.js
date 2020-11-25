const { InfluxDB } = require('@influxdata/influxdb-client')
const configInflux = require("../../../influxdb/config.json")

const token = configInflux.auth.token
const org = configInflux.org.name
const bucket = configInflux.bucket.name
const url = 'http://localhost:8086'
const client = new InfluxDB({ url: url, token: token })


async function getTimeSeriesByIdDataSet(idDataSet) {

    const queryApi = client.getQueryApi(org)
    const query = `from(bucket: "${bucket}") |> range(start: -1h)
                   |> filter(fn: (r) => r["id"] == "${idDataSet}")`
    let dataTimeSeries = []
    const response = await queryApi
        .collectRows(query, (row, tableMeta) =>{
            const rows = tableMeta.toObject(row)
            return rows
        });

    response.forEach(r =>{
        dataTimeSeries.push({time : r._time, value: r._value})
    })
    return dataTimeSeries


}


module.exports = {
    getTimeSeriesByIdDataSet
}
