const expect = require('chai').expect;
const nock = require('nock');
const axios = require('axios').default;
const YELLOW_COLOR = '\x1b[33m'
const GREEN_COLOR = "\x1b[32m"
const MAGENTA_COLOR = "\x1b[35m"
const WHITE_COLOR = "\x1b[37m"


const graphWriterService = "http://localhost:4010"
const dataWriterService = "http://localhost:4020"
const renderServiceService = "http://localhost:4040"
console.log("**************** DEMO *****************")

describe('demo', () => {
    it('demo', () => {
        console.log(GREEN_COLOR, "Le client ajoute un jeu de donnée :");

        console.log(MAGENTA_COLOR, "Envoie une requete ", YELLOW_COLOR, "POST", MAGENTA_COLOR, " avec des datas sur le route", YELLOW_COLOR, "4020/datawriter")

        axios.post(dataWriterService + "/datawriter/", {"points": [
                {
                    "x": 307,
                    "y": 22
                },
                {
                    "x": 610,
                    "y": 135
                },
                {
                    "x": 750,
                    "y": 602
                }
            ]
            }).then((response) => {
                const datasId = response.data;

                console.log(GREEN_COLOR, "Le client recupère un id :");

                console.log(MAGENTA_COLOR, "Le retour de la requête est : ", YELLOW_COLOR, datasId);

                console.log();

                console.log(GREEN_COLOR, "Le client ajoute un histogramme :");

                console.log(MAGENTA_COLOR, "Envoie une requete ", YELLOW_COLOR, "POST", MAGENTA_COLOR, " avec le type ", YELLOW_COLOR, "histogramme", MAGENTA_COLOR," dans le body, sur le route", YELLOW_COLOR, "4010/graphs")


                /*axios.post(graphWriterService + "/graphs/", {"type" : "histogramme"}).then((response) => {
                    const graphId = response.data;

                    console.log(GREEN_COLOR, "Le client recupère un id :");

                    console.log(MAGENTA_COLOR, "Le retour de la requête est : ", YELLOW_COLOR, graphId);

                    console.log();
                });*/
            }
        )
    });

});