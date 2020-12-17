const express = require('express');
const graphWriterDataRouter = express.Router();
const graphWriterDataController = require('../controllers/graphWriterData');
const { param, validationResult } = require('express-validator');

graphWriterDataRouter.post('/graphs/:graphId/dataSet/:dataSetId', [param('graphId').isInt(), param('dataSetId').isInt()], async(req, res, next) => {
   /* 
      #swagger.description = 'Link a graph and a dataSet'
      #swagger.parameters['graphId'] = {
         in: 'param',
         description: 'Id of the graph to link',
         required: true,
         type: 'integer'
        }
      #swagger.parameters['dataSetId'] = {
         in: 'param',
         description: 'Id of the dataSet to link',
         required: true,
         type: 'integer'
        }
      #swagger.tags = ['Link']
   */
   
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
            /*
         #swagger.responses[400] = {
            description: 'Return the validation error array from express validator'
         }
      */
      return res.status(400).json({ errors: errors.array() });
   }
   
   try {
      await graphWriterDataController.graphAddDataSet(req.params.graphId, req.params.dataSetId);

      /*
         #swagger.responses[201] = {
            description: 'ADDED'
         }
      */
      res.status(201).send("ADDED");
   } catch (error){
      /*
         #swagger.responses[500] = {
            description: 'Return the error message'
         }
      */
      res.status(500).send(error.message);
   }

   next();
});

graphWriterDataRouter.delete('/graphs/:graphId/dataSet/:dataSetId', [param('graphId').isInt(), param('dataSetId').isInt()], async (req, res, next) => {
   // #swagger start

   /*
      #swagger.path = '/graphs/{graphId}/dataSet/{dataSetId}'
      #swagger.method = 'delete'
      #swagger.description = 'Delete the link between a graph and a dataSet'
      #swagger.parameters['graphId'] = {
         in: 'param',
         description: 'Id of the graph to unlink',
         required: true,
         type: 'integer'
        }
      #swagger.parameters['dataSetId'] = {
         in: 'param',
         description: 'Id of the dataSet to unlink',
         required: true,
         type: 'integer'
        }
      #swagger.tags = ['Link']
   */
   
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
            /*
         #swagger.responses[400] = {
            description: 'Return the validation error array from express validator'
         }
      */
      return res.status(400).json({ errors: errors.array() });
   }

   try {
      await graphWriterDataController.graphRemoveDataSet(req.params.graphId, req.params.dataSetId);

      /*
         #swagger.responses[201] = {
            description: 'REMOVED'
         }
      */
      res.status(201).send("REMOVED");
   } catch (error){
      /*
         #swagger.responses[500] = {
            description: 'Return the error message'
         }
      */
      res.status(500).send(error.message);
   }

   next();
   // #swagger end
});


module.exports = graphWriterDataRouter;
