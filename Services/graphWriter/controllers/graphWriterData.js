const graphWriterDataSQL = require('../toSQL/graphWriterData')

const graphAddDataSet = async (graphId, dataSetId) => {
    return await graphWriterDataSQL.graphAddDataSet(graphId, dataSetId);
}

const graphRemoveDataSet = async (graphId, dataSetId) => {
    return await graphWriterDataSQL.graphRemoveDataSet(graphId, dataSetId);
}


module.exports = {
    graphAddDataSet,
    graphRemoveDataSet
}