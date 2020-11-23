const { SQLUnknowError } = require('../exceptions/SQLUnknowError');

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'nom',
  host: 'localhost',
  database: 'graphDataBase',
  password: 'termdp',
  port: 5432,
})

const writeData = async (points) => {
    try {
        const result = await pool.query('INSERT INTO DataSets (DataJSON) VALUES ($1) RETURNING *', [JSON.stringify(points)]);

        return result.rows[0].id.toString();
    } catch (err) {
        throw SQLUnknowError(err);
    }
}

module.exports = {
    writeData
}