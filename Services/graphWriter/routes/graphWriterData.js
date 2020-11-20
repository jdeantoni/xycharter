const express = require('express');
const graphWriterDataRouter = express.Router();
const graphWriterDataController = require('../controllers/graphWriterData');
const { param, validationResult } = require('express-validator');

graphWriterDataRouter.post('/graphs/:graphId/data/:dataId', [param('graphId').isString(), param('dataId').isString()], (req, res, next) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }
   
   graphWriterDataController.graphAddData(req.params.graphId, req.params.dataId);

   res.status(201).send("ADDED");

   next();
});

graphWriterDataRouter.delete('/graphs/:graphId/data/:dataId', [param('graphId').isString(), param('dataId').isString()], (req, res, next) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   graphWriterDataController.graphDeleteData(req.params.graphId, req.params.dataId);

   res.status(201).send("DELETED");

   next();
});


module.exports = graphWriterDataRouter;
