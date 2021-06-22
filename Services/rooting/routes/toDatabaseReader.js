const express = require('express');
const axios = require('axios').default;
const databaseReaderRouter = express.Router();
const { body, param, validationResult } = require('express-validator');

//Tout les ids des graph
databaseReaderRouter.get('/graphs'
    , async (req, res, next) => {
        /* 
        #swagger.description = 'Get the id of all graphs'
        #swagger.tags = ['Graphs']
        */
        const reponse = await axios.get(process.env.DBREADER_ADDR + "/graphs");

        var tab = [];

        for (var i = 0; i < reponse.data.length; i++) {
            tab.push(reponse.data[i]);
        }


    /*
    #swagger.responses[200] = {
        description: 'Return the id of all graphs in an array'
    }
    */

        return res.status(200).send(tab);

    });
//Toutes les caractéristique d'un grahe
databaseReaderRouter.get('/graphs/:id'
    , async (req, res, next) => {
    /* 
    #swagger.path = '/graphs/{graphId}'
    #swagger.description = 'Get all information about a graph'
    #swagger.parameters['id'] = {
        in: 'param',
        description: 'The id of the graph',
        required: true,
        type: 'integer'
        }
    #swagger.tags = ['Graphs']
    */
        console.log("databaseReaderRoute: get graphs/", req.params.id)
    const reponse = await axios.get(process.env.DBREADER_ADDR + "/graphs/" + req.params.id);
        console.log("databaseReaderRoute: construct answer with",reponse.data)
    
    /*
    #swagger.responses[200] = {
        description: 'Return the graph charas',
        schema: { $ref: "#/definitions/graph" }
    }
    */

    return res.status(200).send(reponse.data);

});
//Tout les jeux de données
databaseReaderRouter.get('/dataSets'
    , async (req, res, next) => {
    /* 
    #swagger.description = 'Get the id of all dataSets'
    #swagger.tags = ['DataSets']
    */
    console.log("databaseReaderRoute: get dataSets/")
    const reponse = await axios.get(process.env.DBREADER_ADDR + "/dataSets");

    var tab = [];

    for (var i = 0; i < reponse.data.length; i++) {
        tab.push(reponse.data[i]);
    }



    /*
    #swagger.responses[200] = {
        description: 'Return the id of all dataSets'
    }
    */
    return res.status(200).send(tab);
});

//Jeu de donnée id
databaseReaderRouter.get('/dataSets/:id'
    , async (req, res, next) => {
        /* 
        #swagger.description = 'Get all information about a dataSet'
        #swagger.parameters['id'] = {
            in: 'param',
            description: 'The id of the dataSet',
            required: true,
            type: 'integer'
            }
        #swagger.tags = ['DataSets']
        */
        const reponse = await axios.get(process.env.DBREADER_ADDR + "/dataSets/" + req.params.id);


    /*
    #swagger.responses[200] = {
        description: 'Return all information about a dataSet',
        schema: { $ref: "#/definitions/dataSetRead" }
    }
    */
        return res.status(200).send(reponse.data);
    });

//Toute les data pour le graph id
databaseReaderRouter.get('/graphs/:id/data'
    , async (req, res, next) => {
        /* 
        #swagger.description = 'Get all data of dataSets of a graph'
        #swagger.parameters['id'] = {
            in: 'param',
            description: 'The id of the graph',
            required: true,
            type: 'integer'
            }
        #swagger.tags = ['Graphs', 'DataSets']
        */
        const reponse = await axios.get(process.env.DBREADER_ADDR + "/graphs/" + req.params.id + "/datas");

        /*
        #swagger.responses[200] = {
            description: 'Return all data of dataSets of the graph',
            schema: { $ref: "#/definitions/allDatas" }
        }
        */
        return res.status(200).send(reponse.data);
    });

databaseReaderRouter.get('/typesOfGraph'
    , async (req, res, next) => {
        /* 
        #swagger.description = 'Get all types of graph'
        #swagger.tags = ['GraphTypes']
        */
        try{
        const reponse = await axios.get(process.env.DBREADER_ADDR + "/typesOfGraph");
        

        /*
        #swagger.responses[200] = {
            description: 'Return all types of graph',
            schema: { $ref: "#/definitions/graphTypes" }
        }
        */
        return res.status(200).send(reponse.data);
         } catch (e) {
            console.log(e, 'errorrrrrrrrrrrrr');
        }
    });



module.exports = databaseReaderRouter;
