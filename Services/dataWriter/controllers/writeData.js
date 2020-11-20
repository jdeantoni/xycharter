const low = require('lowdb')
const fileSync = require('lowdb/adapters/FileSync')
const adapter = new fileSync('../../GraphDataBase.json')
const db = low(adapter)
var uniqid = require('uniqid');

const writeDataOnDatabase = async (points) => {
    await db.read()
    const id = uniqid()
    
    await db.get("graphPoints").push({ "id": id, "points": points }).write();
    
    return id;
}

module.exports = {
    writeData: writeDataOnDatabase
}