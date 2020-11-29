const { InfluxDB } = require('@influxdata/influxdb-client')
const configInflux = require("../influxConfig.json")

var token;var org; var bucket; var client;
if(Object.keys(configInflux).length > 0){

    token = configInflux.auth.token
    org = configInflux.org.name
    bucket = configInflux.bucket.name
    url = 'http://influx:8086'
    client = new InfluxDB({ url: url, token: token })

}


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
