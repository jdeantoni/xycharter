const postgresConfig = require('../postgreConfig.json')
const dataTimeSeriesReader = require('../controllers/dataTimeSeriesReader');
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
async function getRenderServiceNameGraph(idGraph) {
    const resp =  await pool.query('SELECT serviceName from graphs,graphtype where graphs.idgraphtype = graphtype.idgraphtype AND idgraph = $1', [idGraph])
    console.log("Renvois le nom du renderService utilise pour ce graphe "+idGraph)
    return resp.rows[0].servicename;
}
async function getAllGraphs() {
    const resp =  await pool.query('SELECT * FROM graphs')
    console.log("Renvois tout les id des graphes")
    return resp.rows
}
async function getAllDatasets() {
    const resp =  await pool.query('SELECT * FROM datasets')
    console.log("Renvois tout les id des datasets")
    return resp.rows
}

async function getDataset(idDataset) {
    const resp =  await pool.query('SELECT * FROM datasets WHERE idDataset = $1',[idDataset])
    console.log("Renvois les data du dataset "+ idDataset)
    return resp.rows[0]
}

function minMax(datasetsSet){ //Generate the min and max value for the boolean dataset
    var min = undefined, max = undefined
    for (var dataSets of datasetsSet){
        for (var datas of dataSets){
            if ((typeof datas.value) == "number"){
                if (min === undefined || datas.value < min){
                    min = datas.value;
                }
                if (max === undefined || datas.value > max){
                    max = datas.value;
                }
            }
        }
    }

    if (min === undefined){
        min = 0;
    }
    if (max === undefined){
        max = 1;
    }
    return [min, max]
}

async function getDataForGraph(idGraph) {
    
    if(await isGraphTimeSeries(idGraph)){ //If the graph is a timeserie
        const resp = await getDatasetIdForGraph(idGraph)

        let datasetsSet = [] //Get all the data of the datasets from the influx database
        for(let i =0;i<resp.length;i++){
            const datas = await dataTimeSeriesReader.getTimeSeriesByIdDataSet(resp[i].iddataset)
            datasetsSet.push(datas)
        }
        //Generation of the min and max
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
                } else { //Generate JSON of the boolean dataset with the proper value
                    if (j != 0 && (datas[j - 1].value != (datas[j].value))){
                        dataTimeSeries.push({
                            x : Date.parse(datas[j].time)/1000 - initialTime - ((Date.parse(datas[j].time) - Date.parse(datas[j-1].time)) / 1000000),
                            y : ((datas[j - 1].value == false) ? min : max)
                        });
                    }
                    data = {
                        x : Date.parse(datas[j].time)/1000 - initialTime,
                        y : ((datas[j].value == false) ? min : max)
                    };
                }
                //Add the dataset to the list of datasets
                dataTimeSeries.push(data)
            }
            datasets.push({name:resp[i].name,datajson:JSON.stringify(dataTimeSeries)})
        }

        return datasets

    } else {
        let datasets=[]
        //Send a SQL query to have all the informations of the datasets linked to the graph
        const resp =  await pool.query('SELECT datasets.datajson,datasets.name FROM datasets,linkdatasetgraph WHERE datasets.iddataset = linkdatasetgraph.iddataset and linkdatasetgraph.idgraph = $1', [idGraph])
        console.log("Renvois toute les data associées au graph "+idGraph)
        for(i=0;i<resp.rows.length;i++){
            datasets.push({name:resp.rows[i].name,datajson:resp.rows[i].datajson})
        }
        return datasets
    }
}



async function getAllTypeOfGraph(){
    const resp =  await pool.query('select * from graphtype')
    return resp.rows
}

async function isGraphTimeSeries(idGraph) {
    const resp =  await pool.query('SELECT timeseries FROM datasets,linkdatasetgraph WHERE datasets.idDataset = linkdatasetgraph.idDataset and linkdatasetgraph.idGraph = $1', [idGraph])
    if(resp!==undefined){
        return resp.rows[0].timeseries;
    }
    return false

}

async function getDatasetIdForGraph(idGraph){
    const resp = await pool.query('SELECT datasets.iddataset,datasets.name FROM datasets,linkdatasetgraph WHERE datasets.iddataset = linkdatasetgraph.iddataset and linkdatasetgraph.idgraph = $1', [idGraph])
    
    return resp.rows;

}

module.exports = {
    getCaracGraph,
    getRenderServiceNameGraph,
    getAllDatasets,
    getAllGraphs,
    getDataForGraph,
    getDataset,
    getAllTypeOfGraph
}