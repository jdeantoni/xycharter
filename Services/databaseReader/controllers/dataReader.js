const dataTimeSeriesReader = require('../controllers/dataTimeSeriesReader');
const { Client } = require('pg')
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'qz7skkq8',
    port: 5432,
})
client.connect()

async function getCaracGraph(idGraph) {
    const resp =  await client.query('SELECT * FROM graphs WHERE id = $1', [idGraph])
    return resp.rows
}
async function getAllGraphs() {
    const resp =  await client.query('SELECT id FROM graphs')
    return resp.rows
}

async function getAllDatasets() {
    const resp =  await client.query('SELECT id FROM datasets')
    return resp.rows
}

async function getDataset(idDataset) {
    const resp =  await client.query('SELECT datajson FROM datasets WHERE id = $1',[idDataset])
    return resp.rows
}

async function getDataForGraph(idGraph) {

    if(await isGraphTimeSeries(idGraph)){
        let dataTimeSeries =[]
        const resp = await getDatasetIdForGraph(idGraph)
        resp.forEach((dataSetId)=>{
            const data = await dataTimeSeriesReader.getTimeSeriesByIdDataSet(dataSetId)
            dataTimeSeries.push(data)
        });

        return dataTimeSeries
    }
    
    const resp =  await client.query('SELECT datajson FROM datasets,linkdatasetgraph WHERE datasets.id = linkdatasetgraph.datasetid and linkdatasetgraph.graphid = $1', [idGraph])
    return resp.rows
}

async function isGraphTimeSeries(idGraph) {
    const resp =  await client.query('SELECT * FROM graph WHERE id = $1 and type = "timeseries" ', [idGraph])
    if(resp.rows.length>0) return true
    return false;
}

async function getDatasetIdForGraph(idGraph){
    const resp = await client.query('SELECT datasetid FROM datasets,linkdatasetgraph WHERE datasets.id = linkdatasetgraph.datasetid and linkdatasetgraph.graphid = $1', [idGraph])
    return resp.rows;

}

module.exports = {
    getCaracGraph,
    getAllDatasets,
    getAllGraphs,
    getDataForGraph,
    getDataset
}