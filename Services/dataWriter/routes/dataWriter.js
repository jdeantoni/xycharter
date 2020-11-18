const express = require('express');
const dataWriterRouter = express.Router();
const dataWriterController = require('../controllers/dataWriter');


dataWriterRouter.get('/datawriter'
   , (req, res, next) => {

      return res.status(200).send(dataWriterController.entryPoint());

   });


module.exports = dataWriterRouter;
