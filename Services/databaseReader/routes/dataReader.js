const express = require('express');
const dataReaderRouter = express.Router();
const dataReaderController = require('../controllers/dataReader');

// Recupere le type du graph etc
dataReaderRouter.get('/graphs/:id'
   , async(req, res, next) => {

      return res.status(200).send(await dataReaderController.getCaracGraph(req.params.id));

   });
//Tout les ids des graph
dataReaderRouter.get('/graphs'
    , async(req, res, next) => {

        return res.status(200).send(await dataReaderController.getAllGraphs());

    });
//Tout ids des jeux de données
dataReaderRouter.get('/datas'
    , async(req, res, next) => {

        return res.status(200).send(await dataReaderController.getAllDatasets());

    });

//Jeu de donnée id
dataReaderRouter.get('/datas/:id'
    , async(req, res, next) => {

        return res.status(200).send(await dataReaderController.getDataset(req.params.id));

    });

//Toute les data pour le graph id
dataReaderRouter.get('/datareader/data/:id'
    , async(req, res, next) => {

        return res.status(200).send(await dataReaderController.getDataForGraph(req.params.id));

    });
//Toute les data pour le graph id
dataReaderRouter.get('/graph/type/:id'
    , async(req, res, next) => {

        return res.status(200).send(await dataReaderController.getTypeOfGraph(req.params.id));

    });



module.exports = dataReaderRouter;
