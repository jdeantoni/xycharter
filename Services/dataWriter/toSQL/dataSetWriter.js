const { SQLUnknowError } = require('../exceptions/SQLUnknowError');
const configPostgre = require('../postgreConfig.json')

const Pool = require('pg').Pool
const pool = new Pool({
    user: configPostgre.user,
    host: configPostgre.host,
    database: configPostgre.database,
    password: configPostgre.password,
    port: configPostgre.port
})

const writeDataSet = async (name, description, date, points, isTimeSeries) => {
    if (name == undefined){
        name = "";
    }

    if (description == undefined){
        description = "";
    }

    try {
        const result = await pool.query('INSERT INTO datasets (name, description, creationDate,timeseries, datajson) VALUES ($1, $2, $3, $4,$5) RETURNING *', [name, description, date,isTimeSeries, JSON.stringify(points)]);

        return result.rows[0].iddataset.toString();
    } catch (err) {
        throw SQLUnknowError(err);
    }
}


const modifyDataSet = async (id, name, description, points) => {
    try {
        if (name != undefined){
            await pool.query('UPDATE dataSets SET name = \'' + name + '\' WHERE idDataset = $1', [id]);
        }

        if (description != undefined){
            await pool.query('UPDATE dataSets SET description = \'' + description + '\' WHERE idDataset = $1', [id]);
        }

        if (points != undefined){
            await pool.query('UPDATE dataSets SET DataJSON = \'' + JSON.stringify(points) + '\' WHERE idDataset = $1', [id]);
        }

    } catch (err) {
        throw SQLUnknowError(err);
    }
    
}


module.exports = {
    writeDataSet,
    modifyDataSet
}