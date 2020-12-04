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

const modifyCharas = async (graphId, characteristics) => {
    try {
        
        const responseJSON = (await pool.query('SELECT characteristics FROM graphs WHERE idGraph = $1', [graphId])).rows[0].characteristics;

        const response = JSON.parse(responseJSON);

        Object.assign(response, characteristics);

        await pool.query('UPDATE graphs SET characteristics = \'' + JSON.stringify(response) + '\' WHERE idGraph = $1', [graphId]);

        return response;
    } catch (err) {
        throw SQLUnknowError(err);
    }
}

module.exports = {
    modifyCharas
}