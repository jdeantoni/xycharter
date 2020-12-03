const expect = require('chai').expect;
const nock = require('nock');
const axios = require('axios').default;
const YELLOW_COLOR = '\x1b[33m'
const GREEN_COLOR = "\x1b[32m"
const MAGENTA_COLOR = "\x1b[35m"
const WHITE_COLOR = "\x1b[37m"



var crypto = require('crypto');
const { timeStamp } = require('console');


const routeWriterData = "http://localhost:4020"
const routeWriterGraph = "http://localhost:4010"

const routeRenderGraph = "http://localhost:4040"

console.log("**************** DEMO *****************")

var idDataSet;
var idGraph;
var dataClient;

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

const sendData = () => {
    dataClient = {
        id: idDataSet.toString(),
        timestamp: parseInt(Date.now() / 1000),
        value: getRandomInt(1000)
    }

    console.log(MAGENTA_COLOR, "Le client envoie des données : ", YELLOW_COLOR, dataClient)
    axios.post(routeWriterData + "/datawriter/timeseries", dataClient);

}

axios.post(routeWriterGraph + "/graphs", { "type": "connectedLine" })
    .then((response) => {
        console.log(MAGENTA_COLOR, "Le client récupère la clè du graphe créé : ", YELLOW_COLOR, response.data)
        idGraph = response.data
        axios.get(routeWriterData + "/datawriter/timeseries")
            .then((response) => {
                console.log(MAGENTA_COLOR, "Le client récupère la clè du dataset : ", YELLOW_COLOR, response.data)
                idDataSet = response.data
                axios.post(routeWriterGraph + "/graphs/" + idGraph + "/dataset/" + idDataSet)
                    .then((response) => {
                        console.log(MAGENTA_COLOR, "Le client associe les datasets aux graphes : ", YELLOW_COLOR, response.data)
                        setInterval(sendData, 1000)

                    });


            });
    });


