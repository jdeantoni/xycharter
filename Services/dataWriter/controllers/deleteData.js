const low = require('lowdb')
const fileSync = require('lowdb/adapters/FileSync')
const adapter = new fileSync('../../GraphDataBase.json')
const db = low(adapter)
const exceptions = require("../exceptions/DataIdNotFoundException")

const deleteData = async (id) => {
    await db.read()
    let idData = await db.get("graphPoints").find({"id":id}).value();

    if(idData===undefined){
        throw new exceptions.DataIdNotFoundException();
    }
    
    await db.get("graphPoints").remove({ "id": id }).write();
    
}

module.exports = {
    deleteData
}