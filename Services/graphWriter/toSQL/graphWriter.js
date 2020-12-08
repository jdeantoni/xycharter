const { SQLUnknowError } = require('../exceptions/SQLUnknowError');
const configPostgre = require('../postgreConfig.json')
const { modifyCharas } = require('./graphCharaWriter');

const Pool = require('pg').Pool
const pool = new Pool({
    user: configPostgre.user,
    host: configPostgre.host,
    database: configPostgre.database,
    password: configPostgre.password,
    port: configPostgre.port
})

const createGraph = async (type, name, description, date, chara) => {
    if (name == undefined){
        name = "";
    }

    if (description == undefined){
        description = "";
    }

    try {
        const resultsType = await pool.query('SELECT idgraphtype FROM graphtype WHERE graphtype = $1', [type])
        const idType = resultsType.rows[0].idgraphtype
        const result = await pool.query('INSERT INTO Graphs (name, description, creationDate, idgraphtype, characteristics) VALUES ($1, $2, $3, $4, $5) RETURNING *', [name, description, date, idType, JSON.stringify(chara)]);
        return result.rows[0].idgraph.toString();
    } catch (err) {
        throw SQLUnknowError(err);
    }
}

const modifyGraph = async (id, type, name, description, chara) => {
    try {
        if (type != undefined){
            const resultsType = await pool.query('SELECT idgraphtype FROM graphtype WHERE graphtype = $1', [type])
            const idType = resultsType.rows[0].idgraphtype
            await pool.query('UPDATE graphs SET idgraphtype = ' + idType + ' WHERE idGraph = $1', [id]);
        }

        if (name != undefined){
            await pool.query('UPDATE graphs SET name = \'' + name + '\' WHERE idGraph = $1', [id]);
        }

        if (description != undefined){
            await pool.query('UPDATE graphs SET description = \'' + description + '\' WHERE idGraph = $1', [id]);
        }

        if (chara != undefined){
            modifyCharas(id, chara);
        }

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
    modifyGraph,
    deleteGraph
}