const dataSetWriterSQL = require('../toSQL/dataSetWriter')

const writeDataSetOnDatabase = async (points) => {
    return await dataSetWriterSQL.writeDataSet(points);
}

module.exports = {
    writeDataSet: writeDataSetOnDatabase
}