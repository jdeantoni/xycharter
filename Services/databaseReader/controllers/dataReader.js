
const dataTimeSeriesReader = require('./dataTimeSeriesReader');
const { Pool } = require('pg')
const pool = new Pool({
    user: 'testing',
    host: 'postgres',
    database: 'graphs',
    password: 'bla123',
    port: 5432,
})


async function getCaracGraph(idGraph) {
    const resp =  await pool.query('SELECT * FROM graphs WHERE idgraph = $1', [idGraph])
    return resp.rows
}
async function getAllGraphs() {
    const resp =  await pool.query('SELECT idGraph FROM graphs')
    return resp.rows
}
async function getAllDatasets() {
    const resp =  await pool.query('SELECT idDataset FROM datasets')
    return resp.rows
}

async function getDataset(idDataset) {
    const resp =  await pool.query('SELECT datajson FROM datasets WHERE idDataset = $1',[idDataset])
    return resp.rows
}

async function getDataForGraph(idGraph) {
    

    /*if(await isGraphTimeSeries(idGraph)){
        let dataTimeSeries =[]
        const resp = await getDatasetIdForGraph(idGraph)
        resp.forEach((dataSetId)=>{
            const data = await dataTimeSeriesReader.getTimeSeriesByIdDataSet(dataSetId)
            dataTimeSeries.push(data)
        });

        return dataTimeSeries
    }*/
    
    const resp =  await pool.query('SELECT datajson FROM datasets,linkdatasetgraph WHERE datasets.idDataset = linkdatasetgraph.idDataset and linkdatasetgraph.idGraph = $1', [idGraph])
    return resp.rows
}

async function isGraphTimeSeries(idGraph) {
    const resp =  await pool.query('SELECT * FROM graph WHERE id = $1 and type = "timeseries" ', [idGraph])
    if(resp.rows.length>0) return true
    return false;
}

async function getDatasetIdForGraph(idGraph){
    const resp = await pool.query('SELECT datasets.iddataset FROM datasets,linkdatasetgraph WHERE datasets.iddataset = linkdatasetgraph.iddataset and linkdatasetgraph.idgraph = $1', [idGraph])
    return resp.rows;

}

module.exports = {
    getCaracGraph,
    getAllDatasets,
    getAllGraphs,
    getDataForGraph,
    getDataset
}