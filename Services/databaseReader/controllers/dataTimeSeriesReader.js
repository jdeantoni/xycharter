const { InfluxDB } = require('@influxdata/influxdb-client')

var configInflux = null;
var token;var org; var bucket; var client;

try {
    configInflux = require("../influxConfig.json")

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


async function getTimeSeriesByIdDataSet(idDataSet) {

    const queryApi = client.getQueryApi(org)
    //Get the data from the last hour for the specified dataset
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
