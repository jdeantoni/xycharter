const express = require('express');
const graphWriterRouter = express.Router();
const graphWriterController = require('../controllers/graphWriter');
const { body, param, validationResult } = require('express-validator');

graphWriterRouter.post('/graphs', [body('type').matches(
   "histogramme|connectedLine|doughnut|circlePoint|bezierCurve"
)], async(req, res, next) => {
   /* 
      #swagger.description = 'Creation of a graph'
      #swagger.parameters['type'] = {
         in: 'body',
         description: 'Type of graph created : histogramme,connectedLine,doughnut,circlePoint or bezierCurve',
         required: true,
         type: 'string'
        }
      #swagger.tags = ['Graphs']
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
      const graphId = await graphWriterController.graphCreation(req.body);
   
      /*
         #swagger.responses[201] = {
            description: 'Return the id of the graph created'
         }
      */
      res.status(201).send(graphId);
   } catch (error) {

      /*
         #swagger.responses[500] = {
            description: 'Return the error message'
         }
      */
      res.status(500).send(error.message);
   }

   next();
});

graphWriterRouter.put('/graphs/:id', [param('id').isInt()], async (req, res, next) => {
   /* 
      #swagger.description = 'Modify a specific graph'
      #swagger.parameters['id'] = {
         in: 'param',
         description: 'The id of the graph',
         required: true,
         type: 'integer'
        }
      #swagger.parameters['information to modify'] = {
         in: 'body',
         description: 'Element of the graph to modify',
         required: true,
         type: 'object',
         schema: { $ref: "#/definitions/graph" }
        }
      #swagger.tags = ['Graphs']
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
      await graphWriterController.modifyGraph(req.params.id, req.body);

      /*
         #swagger.responses[201] = {
            description: 'MODIFY'
         }
      */

      res.status(201).send("MODIFY");
   } catch (error) {
      /*
         #swagger.responses[500] = {
            description: 'Return the error message'
         }
      */
      res.status(500).send(error.message);
   }

   next();
});

graphWriterRouter.delete('/graphs/:id', [param('id').isInt()], async (req, res, next) => {
   // #swagger start

   /*
      #swagger.path = '/graphs/{id}'
      #swagger.method = 'delete'
      #swagger.description = 'Suppression of a specific graph'
      #swagger.parameters['id'] = {
         in: 'param',
         description: 'The id of the graph',
         required: true,
         type: 'integer'
        }
      #swagger.tags = ['Graphs']
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
      await graphWriterController.graphDelete(req.params.id);
   

      /*
         #swagger.responses[201] = {
            description: 'DELETED'
         }
      */

      res.status(201).send("DELETED");
   } catch (error) {
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

module.exports = graphWriterRouter;
