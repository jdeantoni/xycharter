const low = require('lowdb')
const fileSync = require('lowdb/adapters/FileSync')
const adapter = new fileSync('../../GraphDataBase.json')
const db = low(adapter)

db.defaults({ graph: [] })
    .write()

const graphCreation = (graphType) => {
    var id = '_' + Math.random().toString(36).substr(2, 9);

    db.get("graph").push({"id": id, "type": graphType}).write();

    return id;
}

const graphDelete = (graphId) => {
    db.get("graph").remove(graph => graph.id == graphId).write();
}

module.exports = {
    graphCreation,
    graphDelete
}