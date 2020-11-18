const low = require('lowdb')
const fileSync = require('lowdb/adapters/FileSync')
const adapter = new fileSync('../../GraphDataBase.json')
const db = low(adapter)

db.defaults({ graph: [] })
    .write()

const graphCreation = () => {
    const id = 1;
    const type = "couille";

    db.get("graph").push({"id": id, "type": type}).write();
}


module.exports = {
    graphCreation
}