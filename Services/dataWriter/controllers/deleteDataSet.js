const dataSetDeleteSQL = require('../toSQL/dataSetDelete')

const deleteDataSet = async (id) => {
    return await dataSetDeleteSQL.deleteDataSet(id);
}

module.exports = {
    deleteDataSet
}