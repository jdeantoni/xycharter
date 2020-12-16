const express = require('express');
const dataReaderRouter = express.Router();
const dataReaderController = require('../controllers/dataReader');

// Recupere le type du graph etc
dataReaderRouter.get('/graphs/:id'
   , async(req, res, next) => {
    /* 
    #swagger.description = 'Get all information about a graph'
    #swagger.parameters['id'] = {
        in: 'param',
        description: 'The id of the graph',
        required: true,
        type: 'integer'
        }
    #swagger.tags = ['Graphs']
    */


    /*
    #swagger.responses[200] = {
        description: 'Return the graph charas',
        schema: { $ref: "#/definitions/graph" }
    }
    */
    return res.status(200).send(await dataReaderController.getCaracGraph(req.params.id));

});

dataReaderRouter.get('/graphs/:id/renderServiceName'
, async(req, res, next) => {
    /* 
    #swagger.description = 'Get the name of the service to use to render the graph'
    #swagger.parameters['id'] = {
        in: 'param',
        description: 'The id of the graph',
        required: true,
        type: 'integer'
        }
    #swagger.tags = ['Graphs']
    */


    /*
    #swagger.responses[200] = {
        description: 'Return the name of the service to use to render the graph ',
        type: 'string'
    }
    */

        return res.status(200).send(await dataReaderController.getRenderServiceNameGraph(req.params.id));

    });
//Tout les ids des graph
dataReaderRouter.get('/graphs'
    , async(req, res, next) => {
    /* 
    #swagger.description = 'Get the id of all graphs'
    #swagger.tags = ['Graphs']
    */

    /*
    #swagger.responses[200] = {
        description: 'Return the id of all graphs',
        schema: { $ref: "#/definitions/graphIds" }
    }
    */

    return res.status(200).send(await dataReaderController.getAllGraphs());

});
//Tout ids des jeux de données
dataReaderRouter.get('/dataSets'
    , async(req, res, next) => {
    /* 
    #swagger.description = 'Get the id of all dataSets'
    #swagger.tags = ['DataSets']
    */


    /*
    #swagger.responses[200] = {
        description: 'Return the id of all dataSets',
        schema: { $ref: "#/definitions/dataSetIds" }
    }
    */

    return res.status(200).send(await dataReaderController.getAllDatasets());

});

//Jeu de donnée id
dataReaderRouter.get('/dataSets/:id'
    , async(req, res, next) => {
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

    /*
    #swagger.responses[200] = {
        description: 'Return all information about a dataSet',
        schema: { $ref: "#/definitions/dataSet" }
    }
    */

    return res.status(200).send(await dataReaderController.getDataset(req.params.id));

});

//Toute les data pour le graph id
dataReaderRouter.get('/graphs/:id/datas'
    , async(req, res, next) => {

    try {
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

        /*
        #swagger.responses[200] = {
            description: 'Return all data of dataSets of the graph',
            schema: { $ref: "#/definitions/allDatas" }
        }
        */

        return res.status(200).send(await dataReaderController.getDataForGraph(req.params.id));
    } catch (error) {
        return res.status(404).send(error)
    }

});


//Toute les types de graphes
dataReaderRouter.get('/typesOfGraph'
    , async (req, res, next) => {

        return res.status(200).send(await dataReaderController.getAllTypeOfGraph());

    });


module.exports = dataReaderRouter;
