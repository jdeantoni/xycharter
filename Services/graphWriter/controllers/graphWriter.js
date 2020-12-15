const graphWriterSQL = require('../toSQL/graphWriter')
const axios = require('axios').default;

const graphCreation = async (graph) => {
    const date = new Date(Date.now()).toISOString();

    await axios.get(process.env.DBREADER_ADDR + "/graphs").then(response => {
        const arrayData = response.data
        for(let i=0;i<arrayData.length;i++){
            if(arrayData[i].name===graph.name) throw new Error("Graph name already exist in database")
        }
    })

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