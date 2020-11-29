const dataSetWriterSQL = require('../toSQL/dataSetWriter')

const writeDataSetOnDatabase = async (points) => {
    return await dataSetWriterSQL.writeDataSet(points);
}

const writeDataSetIdTimeSeries = async (isTimeSeries) => {
    return await dataSetWriterSQL.writeDataSetIdTimeSeries(isTimeSeries);
}

module.exports = {
    writeDataSet: writeDataSetOnDatabase,
    writeDataSetIdTimeSeries
}