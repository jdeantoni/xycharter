const dataSetWriterSQL = require('../toSQL/dataSetWriter')

const writeDataSetOnDatabase = async (name, description, points) => {
    const date = new Date(Date.now()).toISOString();

    return await dataSetWriterSQL.writeDataSet(name, description, date, points);
}


const modifyDataSet = async (id, dataSet) => {
    await dataSetWriterSQL.modifyDataSet(id, dataSet.name, dataSet.description, dataSet.points);
}

const writeDataSetIdTimeSeries = async (isTimeSeries) => {
    return await dataSetWriterSQL.writeDataSetIdTimeSeries(isTimeSeries);
}

module.exports = {
    writeDataSet: writeDataSetOnDatabase,
    modifyDataSet,
    writeDataSetIdTimeSeries
}