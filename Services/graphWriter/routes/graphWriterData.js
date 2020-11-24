const express = require('express');
const graphWriterDataRouter = express.Router();
const graphWriterDataController = require('../controllers/graphWriterData');
const { param, validationResult } = require('express-validator');

graphWriterDataRouter.post('/graphs/:graphId/dataSet/:dataSetId', [param('graphId').isInt(), param('dataSetId').isInt()], async(req, res, next) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }
   
   try {
      await graphWriterDataController.graphAddDataSet(req.params.graphId, req.params.dataSetId);

      res.status(201).send("ADDED");
   } catch (error){
      res.status(500).send(error.message);
   }

   next();
});

graphWriterDataRouter.delete('/graphs/:graphId/dataSet/:dataSetId', [param('graphId').isString(), param('dataSetId').isString()], async (req, res, next) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   try {
      await graphWriterDataController.graphRemoveDataSet(req.params.graphId, req.params.dataSetId);

      res.status(201).send("REMOVED");
   } catch (error){
      res.status(500).send(error.message);
   }

   next();
});


module.exports = graphWriterDataRouter;
