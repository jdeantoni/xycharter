const expect = require('chai').expect;
const nock = require('nock');
const axios = require('axios').default;
const YELLOW_COLOR = '\x1b[33m'
const GREEN_COLOR = "\x1b[32m"
const MAGENTA_COLOR = "\x1b[35m"
const WHITE_COLOR = "\x1b[37m"


var uniqid  = require('uniqid')
const { timeStamp } = require('console');


const rooting = "http://localhost:4000"

console.log("**************** Demo client send integer data timeseries *****************")

var idDataSet;
var dataClient;
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

const sendData = () => {
    
    dataClient = {
        name: "dataSetTimeSeries",
        id: idDataSet.toString(),
        timestamp: parseInt(Date.now() / 1000),
        value: getRandomInt(1000)
    }

    console.log(MAGENTA_COLOR, "Le client envoie des données : ", YELLOW_COLOR, dataClient)
    axios.post(rooting + "/dataSets/timeseries", dataClient);

}


axios.get(rooting + "/dataSets/timeseries")
    .then((response) => {
        console.log(MAGENTA_COLOR, "Le client récupère la clè du dataset : ", YELLOW_COLOR, response.data)
        idDataSet = response.data
        setInterval(sendData, 1000)


    });


