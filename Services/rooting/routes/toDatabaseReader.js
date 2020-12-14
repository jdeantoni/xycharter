const express = require('express');
const axios = require('axios').default;
const databaseReaderRouter = express.Router();
const { body, param, validationResult } = require('express-validator');

//Tout les ids des graph
databaseReaderRouter.get('/graphs'
    , async (req, res, next) => {
        const reponse = await axios.get(process.env.DBREADER_ADDR + "/graphs");

        var tab = [];

        for (var i = 0; i < reponse.data.length; i++) {
            tab.push(reponse.data[i]);
        }

        return res.status(200).send(tab);

    });
//Toutes les caractéristique d'un grahe
databaseReaderRouter.get('/graphs/:id'
    , async (req, res, next) => {
        const reponse = await axios.get(process.env.DBREADER_ADDR + "/graphs/" + req.params.id);

        return res.status(200).send(reponse.data);

    });
//Tout les jeux de données
databaseReaderRouter.get('/datas'
    , async (req, res, next) => {
        const reponse = await axios.get(process.env.DBREADER_ADDR + "/datas");

        var tab = [];

        for (var i = 0; i < reponse.data.length; i++) {
            tab.push(reponse.data[i]);
        }

        return res.status(200).send(tab);
    });

//Jeu de donnée id
databaseReaderRouter.get('/datas/:id'
    , async (req, res, next) => {
        const reponse = await axios.get(process.env.DBREADER_ADDR + "/datas/" + req.params.id);

        return res.status(200).send(reponse.data);
    });

//Toute les data pour le graph id
databaseReaderRouter.get('/graphs/:id/datas'
    , async (req, res, next) => {
        const reponse = await axios.get(process.env.DBREADER_ADDR + "/datareader/data/" + req.params.id);

        return res.status(200).send(reponse.data);
    });

databaseReaderRouter.get('/graph/types'
    , async (req, res, next) => {
        const reponse = await axios.get(process.env.DBREADER_ADDR + "/graph/types");

        return res.status(200).send(reponse.data);
    });



module.exports = databaseReaderRouter;