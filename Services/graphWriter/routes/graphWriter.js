const express = require('express');
const graphWriterRouter = express.Router();
const graphWriterController = require('../controllers/graphWriter');


graphWriterRouter.get('/graphWriter'
   , (req, res, next) => {

      graphWriterController.fonction();

   });


module.exports = graphWriterRouter;
