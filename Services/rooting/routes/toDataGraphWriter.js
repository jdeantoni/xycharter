const { response } = require('express');
const express = require('express');
const axios = require('axios').default;
const dataGraphWriterRouter = express.Router();
const { body,param, validationResult } = require('express-validator');

const graphWriterService = "http://localhost:4010"
const dataWriterService = "http://localhost:4020"

dataGraphWriterRouter.post('/graphs/:graphId/points', [param('graphId').isInt(), body("points").isArray()]
   , async(req, res, next) => {

   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   try {
      const dataSetId = await (await axios.post(dataWriterService + "/datawriter", req.body )).data;
      const reponse = await axios.post(graphWriterService + "/graphs/" + req.params.graphId + "/dataSet/" + dataSetId)
      

      res.status(200).send(reponse.data.toString());
   } catch (error) {      
      res.status(501).send(error);
   }

   next();
});

module.exports = dataGraphWriterRouter;
