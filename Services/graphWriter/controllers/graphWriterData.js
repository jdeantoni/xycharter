const low = require('lowdb')
const fileSync = require('lowdb/adapters/FileSync')
const adapter = new fileSync('../../GraphDataBase.json')
const db = low(adapter)
var uniqid = require('uniqid');

db.defaults({ graph: [] })
    .write()

const graphAddData = (graphId, dataId) => {
    db.read()

    const graph = db.get("graph")
        .find({ id: graphId })
        .value();
    
    var datasId = graph.datasId;
    datasId.push(dataId);

    db.get("graph")
        .find({ id: graphId })
        .assign({ datasId: datasId })
        .write();
}

const graphDeleteData = (graphId, dataId) => {
    db.read()

    const graph = db.get("graph")
        .find({ id: graphId })
        .value();
    
    var datasId = graph.datasId;
    datasId = datasId.filter(data => data != dataId);

    db.get("graph")
        .find({ id: graphId })
        .assign({ datasId: datasId })
        .write();
}


module.exports = {
    graphAddData,
    graphDeleteData
}