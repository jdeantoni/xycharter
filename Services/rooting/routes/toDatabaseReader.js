const express = require('express');
const axios = require('axios').default;
const databaseReaderRouter = express.Router();
const { body,param, validationResult } = require('express-validator');

//Tout les ids des graph
databaseReaderRouter.get('/graphs'
    , async(req, res, next) => {
        const reponse = await axios.get(process.env.DBREADER_ADDR + "/graphs");

        var tab = [];

        for (var i = 0; i < reponse.data.length; i++){
            tab.push(reponse.data[i].idgraph);
        }

        return res.status(200).send(tab);

    });
//Tout ids des jeux de données
databaseReaderRouter.get('/datas'
    , async(req, res, next) => {
        const reponse = await axios.get(process.env.DBREADER_ADDR + "/datas");

        var tab = [];

        for (var i = 0; i < reponse.data.length; i++){
            tab.push(reponse.data[i].iddataset);
        }

        return res.status(200).send(tab);
    });

//Jeu de donnée id
databaseReaderRouter.get('/datas/:id'
    , async(req, res, next) => {
        const reponse = await axios.get(process.env.DBREADER_ADDR + "/datas/" + req.params.id);

        return res.status(200).send(reponse.data[0].datajson);
    });

//Toute les data pour le graph id
databaseReaderRouter.get('/graphs/:id/datas'
    , async(req, res, next) => {
        const reponse = await axios.get(process.env.DBREADER_ADDR + "/datareader/data/" + req.params.id);

        return res.status(200).send(reponse.data);
    });



module.exports = databaseReaderRouter;