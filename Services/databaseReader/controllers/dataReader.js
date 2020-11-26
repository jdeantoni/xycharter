const postgresConfig = require('../postgreConfig.json')
const { Pool } = require('pg')
const pool = new Pool({
    user: postgresConfig.user,
    host: postgresConfig.host,
    database: postgresConfig.database,
    password: postgresConfig.password,
    port: postgresConfig.port,
})


async function getCaracGraph(idGraph) {
    const resp =  await pool.query('SELECT * FROM graphs WHERE idgraph = $1', [idGraph])
    console.log("Renvois les caractéristique du graphe "+idGraph)
    return resp.rows
}
async function getAllGraphs() {
    const resp =  await pool.query('SELECT idGraph FROM graphs')
    console.log("Renvois tout les id des graphes")
    return resp.rows
}
async function getAllDatasets() {
    const resp =  await pool.query('SELECT idDataset FROM datasets')
    console.log("Renvois tout les id des datasets")
    return resp.rows
}

async function getDataset(idDataset) {
    const resp =  await pool.query('SELECT datajson FROM datasets WHERE idDataset = $1',[idDataset])
    console.log("Renvois les data du dataset "+ idDataset)
    return resp.rows
}

async function getDataForGraph(idGraph) {
    const resp =  await pool.query('SELECT datajson FROM datasets,linkdatasetgraph WHERE datasets.idDataset = linkdatasetgraph.idDataset and linkdatasetgraph.idGraph = $1', [idGraph])
    console.log("Renvois toute les data associées au graph "+idGraph)
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