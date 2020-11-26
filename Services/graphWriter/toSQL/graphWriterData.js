const { SQLLinkAlreadyExistException } = require('../exceptions/SQLLinkAlreadyExistException');
const { SQLfkDataset } = require('../exceptions/SQLfkDataset');
const { SQLfkGraph } = require('../exceptions/SQLfkGraph');
const { SQLUnknowError } = require('../exceptions/SQLUnknowError');
const configPostgre = require('../../../PostgreSQL/config.json')

const Pool = require('pg').Pool
const pool = new Pool({
    user: configPostgre.user,
    host: configPostgre.host,
    database: configPostgre.database,
    password: configPostgre.password,
    port: configPostgre.port
})

const graphAddDataSet = async (graphId, dataSetId) => {
    try {
        await pool.query('INSERT INTO linkDataSetGraph (idgraph, iddataset) VALUES ($1, $2)', [graphId, dataSetId]);
    } catch (err) {
        if (err.constraint == "linkdatasetgraph_pkey"){
            throw SQLLinkAlreadyExistException();
        } else if (err.constraint == "fk_dataset"){
            throw SQLfkDataset();
        } else  if (err.constraint == "fk_graph"){
            throw SQLfkGraph();
        } else {
            throw SQLUnknowError(err);
        }
    }
}

const graphRemoveDataSet = async (graphId, dataSetId) => {
    try {
        //Suppression du lien entre le graph et le dataSet
        await pool.query('DELETE FROM linkDataSetGraph WHERE idgraph = ($1) AND iddataset = ($2)', [graphId, dataSetId]);
    } catch (err) {
        throw SQLUnknowError(err);
    }
}

module.exports = {
    graphAddDataSet,
    graphRemoveDataSet
}