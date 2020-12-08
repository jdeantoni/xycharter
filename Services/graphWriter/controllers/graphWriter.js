const graphWriterSQL = require('../toSQL/graphWriter')

const graphCreation = async (graph) => {
    const date = new Date(Date.now()).toISOString();

    graphCara = { ...graph };
    delete graphCara.name;
    delete graphCara.description;
    delete graphCara.type;

    return await graphWriterSQL.createGraph(graph.type, graph.name, graph.description, date, graphCara);
}

const modifyGraph = async (id, graph) => {
    graphCara = { ...graph };
    delete graphCara.name;
    delete graphCara.description;
    delete graphCara.type;

    await graphWriterSQL.modifyGraph(id, graph.type, graph.name, graph.description, graphCara);
}

const graphDelete = async (graphId) => {
    await graphWriterSQL.deleteGraph(graphId);
}

module.exports = {
    graphCreation,
    modifyGraph,
    graphDelete
}