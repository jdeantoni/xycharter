const graphCharaWriterSQL = require('../toSQL/graphCharaWriter')

const modifyCharas = async (graphId, characteristics) => {
    return await graphCharaWriterSQL.modifyCharas(graphId, characteristics);
}

module.exports = {
    modifyCharas
}