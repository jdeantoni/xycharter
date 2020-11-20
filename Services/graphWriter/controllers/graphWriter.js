const low = require('lowdb')
const fileSync = require('lowdb/adapters/FileSync')
const adapter = new fileSync('../../GraphDataBase.json')
const db = low(adapter)

db.defaults({ graph: [] })
    .write()

const graphCreation = async (graphType) => {
    var id = uniqid();
    await db.read()

    db.get("graph")
        .push({ "id": id, "type": graphType, "datasId": [] })
        .write();

    return id;
}

const graphDelete = (graphId) => {
    db.get("graph")
        .remove(graph => graph.id == graphId)
        .write();
}

module.exports = {
    graphCreation,
    graphDelete
}