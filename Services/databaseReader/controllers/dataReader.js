const postgresConfig = require('../postgreConfig.json')
const dataTimeSeriesReader = require('../controllers/dataTimeSeriesReaderCP');
const { Pool } = require('pg')
const pool = new Pool({
    user: postgresConfig.user,
    host: postgresConfig.host,
    database: postgresConfig.database,
    password: postgresConfig.password,
    port: postgresConfig.port,
})


async function getCaracGraph(idGraph) {
    const resp =  await pool.query('SELECT idgraph,name, description, creationDate, graphtype.graphtype, characteristics from graphs,graphtype where graphs.idgraphtype = graphtype.idgraphtype AND idgraph = $1', [idGraph])
    console.log("Renvois les caractéristique du graphe "+idGraph)
    return resp.rows
}
async function getAllGraphs() {
    const resp =  await pool.query('SELECT idGraph FROM graphs')
    console.log("Renvois tout les id des graphes")
    return resp.rows
}
async function getAllDatasets() {
    const resp =  await pool.query('SELECT idDataset FROM datasets')
    console.log("Renvois tout les id des datasets")
    return resp.rows
}

async function getDataset(idDataset) {
    const resp =  await pool.query('SELECT * FROM datasets WHERE idDataset = $1',[idDataset])
    console.log("Renvois les data du dataset "+ idDataset)
    return resp.rows[0]
}

function minMax(datasetsSet){
    var min = undefined, max = undefined
    for (var dataSets of datasetsSet){
        for (var datas of dataSets){
            if ((typeof datas.value) == "number"){
                if (min == undefined || datas.value < min){
                    min = datas.value;
                }
                if (max == undefined || datas.value > max){
                    max = datas.value;
                }
            }
        }
    }

    if (min == undefined){
        min = 0;
    }
    if (max == undefined){
        max = 1;
    }
    return [min, max]
}

async function getDataForGraph(idGraph) {
    


    //if(await isGraphTimeSeries(idGraph)){
    if (true){
        //const resp = await getDatasetIdForGraph(idGraph)
        const resp = [{iddataset : 0, name : "pasbool"},{iddataset : 0, name : "bool"}]

        let datasetsSet = []
        for(let i =0;i<resp.length;i++){
            const datas = await dataTimeSeriesReader.getTimeSeriesByIdDataSet(resp[i].iddataset,i+2)
            datasetsSet.push(datas)
        }

        const [min, max] = minMax(datasetsSet);

        let datasets = []
        for(let i =0;i<resp.length;i++){
            let dataTimeSeries =[]
            const datas = datasetsSet[i]
            let initialTime = datas.length === 0 ? 0 : Date.parse(datas[0].time)/1000
            for (let j = 0; j < datas.length; j++) {
                var data;
                if ((typeof datas[j].value) == "number"){
                    data = {
                        x : Date.parse(datas[j].time)/1000 - initialTime,
                        y : datas[j].value
                    };
                } else {
                    data = {
                        x : Date.parse(datas[j].time)/1000 - initialTime,
                        y : ((datas[j].value == false) ? min : max)
                    };
                }

                dataTimeSeries.push(data)
            }
            console.log({name:resp[i].name,datajson:JSON.stringify(dataTimeSeries)})
            datasets.push({name:resp[i].name,datajson:JSON.stringify(dataTimeSeries)})
        }



        //return datasets
        return "cool"

    }

    const resp =  await pool.query('SELECT datajson FROM datasets,linkdatasetgraph WHERE datasets.idDataset = linkdatasetgraph.idDataset and linkdatasetgraph.idGraph = $1', [idGraph])
    console.log("Renvois toute les data associées au graph "+idGraph)
    console.log(resp.rows)
    return resp.rows
}


async function getTypeOfGraph(idGraph){
    const resp =  await pool.query('select graphtype from graphtype where idgraphtype = (select idgraphtype from graphs where idgraph = $1)', [idGraph])
    console.log("Renvois le type du graphe "+idGraph)
    return resp.rows
}

async function isGraphTimeSeries(idGraph) {
    const resp =  await pool.query('SELECT timeseries FROM datasets,linkdatasetgraph WHERE datasets.idDataset = linkdatasetgraph.idDataset and linkdatasetgraph.idGraph = $1', [idGraph])
    
    return resp.rows[0].timeseries;


}

async function getDatasetIdForGraph(idGraph){
    const resp = await pool.query('SELECT datasets.iddataset,datasets.name FROM datasets,linkdatasetgraph WHERE datasets.iddataset = linkdatasetgraph.iddataset and linkdatasetgraph.idgraph = $1', [idGraph])
    return resp.rows;

}

module.exports = {
    getCaracGraph,
    getAllDatasets,
    getAllGraphs,
    getDataForGraph,
    getDataset,
    getTypeOfGraph
}