const dataSetWriterSQL = require('../toSQL/dataSetWriter')

const writeDataSetOnDatabase = async (name, description, points, isTimeSeries) => {
    const date = new Date(Date.now()).toISOString();

    return await dataSetWriterSQL.writeDataSet(name, description, date, points, false);
}


const modifyDataSet = async (id, dataSet) => {
    await dataSetWriterSQL.modifyDataSet(id, dataSet.name, dataSet.description, dataSet.points);
}

module.exports = {
    writeDataSet: writeDataSetOnDatabase,
    modifyDataSet
}