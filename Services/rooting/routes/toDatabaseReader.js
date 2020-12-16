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
databaseReaderRouter.get('/data'
    , async (req, res, next) => {
        const reponse = await axios.get(process.env.DBREADER_ADDR + "/data");

        var tab = [];

        for (var i = 0; i < reponse.data.length; i++) {
            tab.push(reponse.data[i]);
        }

        return res.status(200).send(tab);
    });

//Jeu de donnée id
databaseReaderRouter.get('/data/:id'
    , async (req, res, next) => {
        const reponse = await axios.get(process.env.DBREADER_ADDR + "/data/" + req.params.id);

        return res.status(200).send(reponse.data);
    });

//Toute les data pour le graph id
databaseReaderRouter.get('/graphs/:id/data'
    , async (req, res, next) => {
<<<<<<< HEAD
        const reponse = await axios.get(process.env.DBREADER_ADDR + "/graphs/" + req.params.id + "/datas");
=======
        const reponse = await axios.get(process.env.DBREADER_ADDR + "/graphs/" + req.params.id + "/data");
>>>>>>> dev

        return res.status(200).send(reponse.data);
    });

databaseReaderRouter.get('/typesOfGraph'
    , async (req, res, next) => {
        const reponse = await axios.get(process.env.DBREADER_ADDR + "/typesOfGraph");

        return res.status(200).send(reponse.data);
    });



module.exports = databaseReaderRouter;