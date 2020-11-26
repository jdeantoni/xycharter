const { SQLUnknowError } = require('../exceptions/SQLUnknowError');

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'testing',
    host: 'postgres',
    database: 'graphs',
    password: 'bla123',
    port: 5432,
})

const writeDataSet = async (points) => {
    try {
        const result = await pool.query('INSERT INTO DataSets (DataJSON) VALUES ($1) RETURNING *', [JSON.stringify(points)]);

        return result.rows[0].id.toString();
    } catch (err) {
        throw SQLUnknowError(err);
    }
}

module.exports = {
    writeDataSet
}