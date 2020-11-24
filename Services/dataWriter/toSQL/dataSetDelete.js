const { SQLUnknowError } = require('../exceptions/SQLUnknowError');
const { DataSetIdNotFoundException } = require("../exceptions/DataSetIdNotFoundException")

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'nom',
  host: 'localhost',
  database: 'graphDataBase',
  password: 'termdp',
  port: 5432,
})

const deleteDataSet = async (dataSetId) => {
    var result;
    try {
        result = await pool.query('DELETE FROM DataSets WHERE id = ($1)', [dataSetId]);
    } catch (err) {
        throw SQLUnknowError(err);
    }

    if (result.rowCount == 0){
        throw new DataSetIdNotFoundException();
    }
}

module.exports = {
    deleteDataSet
}