const low = require('lowdb')
const fileSync = require('lowdb/adapters/FileSync')
const adapter = new fileSync('../../GraphDataBase.json')
const db = low(adapter)
var uniqid = require('uniqid');
const dataWriterSQL = require('../toSQL/dataWriter')

const writeDataOnDatabase = async (points) => {
    return await dataWriterSQL.writeData(points);
}

module.exports = {
    writeData: writeDataOnDatabase
}