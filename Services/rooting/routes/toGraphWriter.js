const express = require('express');
const axios = require('axios').default;
const graphWriterRouter = express.Router();
const { body,param, validationResult } = require('express-validator');

graphWriterRouter.post('/graphs', [body('type').matches(
   "histogramme|connectedLine"
)]
   , async(req, res, next) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   try {
      const reponse = await axios.post(process.env.GRAPHWRITER_ADDR + "/graphs", req.body)
      

      res.status(200).send(reponse.data.toString());
   } catch (error) {      
      res.status(501).send(error);
   }

   next();
});

graphWriterRouter.delete('/graphs/:id', [param('id').isInt()], async (req, res, next) => {
   
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }
  
   try {
      const reponse = await axios.delete(process.env.GRAPHWRITER_ADDR + "/graphs/" + req.params.id)
      
      res.status(200).send(reponse.data.toString());
   } catch (error) {      
      res.status(501).send(error);
   }

   next();
});


graphWriterRouter.post('/graphs/:graphId/dataSet/:dataSetId', [param('graphId').isInt(), param('dataSetId').isInt()], async(req, res, next) => {
   
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   try {
      const reponse = await axios.post(process.env.GRAPHWRITER_ADDR + "/graphs/" + req.params.graphId + "/dataSet/" + req.params.dataSetId)
      
      res.status(200).send(reponse.data.toString());
   } catch (error) {      
      res.status(501).send(error);
   }

   next();
});

graphWriterRouter.delete('/graphs/:graphId/dataSet/:dataSetId', [param('graphId').isString(), param('dataSetId').isString()], async (req, res, next) => {
   
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }
  
   try {
      const reponse = await axios.delete(process.env.GRAPHWRITER_ADDR + "/graphs/" + req.params.graphId + "/dataSet/" + req.params.dataSetId)
      
      res.status(200).send(reponse.data.toString());
   } catch (error) {      
      res.status(501).send(error);
   }

   next();
});


module.exports = graphWriterRouter;
