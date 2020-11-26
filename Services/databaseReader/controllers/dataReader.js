const { Pool } = require('pg')
const pool = new Pool({
    user: 'testing',
    host: 'postgres',
    database: 'graphs',
    password: 'bla123',
    port: 5432,
})


async function getCaracGraph(idGraph) {
    const resp =  await pool.query('SELECT * FROM graphs WHERE graphid = $1', [idGraph])
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
    const resp =  await pool.query('SELECT datajson FROM datasets,linkdatasetgraph WHERE datasets.idDataset = linkdatasetgraph.idDataset and linkdatasetgraph.idGraph = $1', [idGraph])
    return resp.rows
}

module.exports = {
    getCaracGraph,
    getAllDatasets,
    getAllGraphs,
    getDataForGraph,
    getDataset
}