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

const createGraph = async (type) => {
    try {
        const resultsType = await pool.query('SELECT idgraphtype FROM graphtype WHERE graphtype = $1', [type])
        const idType = resultsType.rows[0].idgraphtype
        const result = await pool.query('INSERT INTO Graphs (idgraphtype) VALUES ($1) RETURNING *', [idType]);
        return result.rows[0].idgraph.toString();
    } catch (err) {
        throw SQLUnknowError(err);
    }
}

const deleteGraph = async (graphId) => {
    try {
        //Suppression de tout les graphs
        await pool.query('DELETE FROM Graphs WHERE idgraph = ($1)', [graphId]);

        //Suppression de tout les liens en lien avec ce graph
        await pool.query('DELETE FROM LinkDataSetGraph WHERE idgraph = ($1)', [graphId]);

        return "DELETED";
    } catch (err) {
        throw SQLUnknowError(err);
    }
}

module.exports = {
    createGraph,
    deleteGraph
}