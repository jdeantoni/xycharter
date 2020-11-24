const { SQLLinkAlreadyExistException } = require('../exceptions/SQLLinkAlreadyExistException');
const { SQLfkDataset } = require('../exceptions/SQLfkDataset');
const { SQLfkGraph } = require('../exceptions/SQLfkGraph');
const { SQLUnknowError } = require('../exceptions/SQLUnknowError');

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'nom',
  host: 'localhost',
  database: 'graphDataBase',
  password: 'termdp',
  port: 5432,
})

const graphAddDataSet = async (graphId, dataSetId) => {
    try {
        await pool.query('INSERT INTO LinkDataSetGraph (DataSetId, GraphId) VALUES ($1, $2)', [dataSetId, graphId]);
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
        await pool.query('DELETE FROM LinkDataSetGraph WHERE GraphId = ($1) AND DataSetId = ($2)', [graphId, dataSetId]);
    } catch (err) {
        throw SQLUnknowError(err);
    }
}

module.exports = {
    graphAddDataSet,
    graphRemoveDataSet
}