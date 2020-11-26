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

const writeDataSet = async (points) => {
    try {
        const result = await pool.query('INSERT INTO datasets (datajson) VALUES ($1) RETURNING *', [JSON.stringify(points)]);

        return result.rows[0].iddataset.toString();
    } catch (err) {
        throw SQLUnknowError(err);
    }
}

module.exports = {
    writeDataSet
}