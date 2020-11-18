const low = require('lowdb')
const fileSync = require('lowdb/adapters/FileSync')
const adapter = new fileSync('../../GraphDataBase.json')
const db = low(adapter)

db.defaults({ graph: [] })
    .write()

const graphCreation = (graphType) => {
    var id = '_' + Math.random().toString(36).substr(2, 9);
    const type = "couille";

    db.get("graph").push({"id": id, "type": graphType}).write();

    return id;
}


module.exports = {
    graphCreation
}