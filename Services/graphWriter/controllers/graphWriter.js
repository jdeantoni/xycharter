const graphWriterSQL = require('../toSQL/graphWriter')

const graphCreation = async (graphType) => {
    return await graphWriterSQL.createGraph(graphType);
}

const graphDelete = async (graphId) => {
    await graphWriterSQL.deleteGraph(graphId);
}

module.exports = {
    graphCreation,
    graphDelete
}