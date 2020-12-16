const express = require('express');
const axios = require('axios').default;
const graphWriterRouter = express.Router();
const { body,param, validationResult } = require('express-validator');
const { graphCharaValidator } = require('../controllers/graphCharaValidator.js');

graphWriterRouter.post('/graphs', [body('type').matches(
   "histogramme|connectedLine|circlePoint|bezierCurve|doughnut"
)]
   , async(req, res, next) => {
   // #swagger start

   /* 
   #swagger.path = '/graphs/'
   #swagger.method = 'post'
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
   const errorsInCharacteristics = graphCharaValidator(req);
   if (errorsInCharacteristics.length != 0) {
      return res.status(400).json({ errors: errorsInCharacteristics });
   }

   try {
      const reponse = await axios.post(process.env.GRAPHWRITER_ADDR + "/graphs", req.body)      

      /*
         #swagger.responses[201] = {
            description: 'Return the id of the graph created'
         }
      */
      res.status(201).send(reponse.data.toString());
   } catch (error) {      
      /*
         #swagger.responses[501] = {
            description: 'Return the error message'
         }
      */
      res.status(501).send(error);
   }

   next();

   // #swagger end
});

//modification d'un graph
graphWriterRouter.put('/graphs/:id', [param('id').isInt()], async (req, res, next) => {
      // #swagger start

   /* 
      #swagger.path = '/graphs/{id}/'
      #swagger.method = 'put'
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
   const errorsInCharacteristics = graphCharaValidator(req);
   if (errorsInCharacteristics.length != 0) {
      return res.status(400).json({ errors: errorsInCharacteristics });
   }

   try {
      const reponse = await axios.put(process.env.GRAPHWRITER_ADDR + "/graphs/" + req.params.id, req.body)
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

   // #swagger end
});

graphWriterRouter.delete('/graphs/:id', [param('id').isInt()], async (req, res, next) => {
   // #swagger start

   /*
      #swagger.path = '/graphs/{id}/'
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
      const reponse = await axios.delete(process.env.GRAPHWRITER_ADDR + "/graphs/" + req.params.id)
      
      /*
         #swagger.responses[201] = {
            description: 'DELETED'
         }
      */
      res.status(200).send(reponse.data.toString());
   } catch (error) {      
      /*
         #swagger.responses[501] = {
            description: 'Return the error message'
         }
      */
      res.status(501).send(error);
   }

   next();

   // #swagger end
});


graphWriterRouter.post('/graphs/:graphId/dataSet/:dataSetId', [param('graphId').isInt(), param('dataSetId').isInt()], async(req, res, next) => {
      // #swagger start

   /* 
      #swagger.path = '/graphs/{graphId}/dataSet/{dataSetId}'
      #swagger.method = 'post'
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
      const reponse = await axios.post(process.env.GRAPHWRITER_ADDR + "/graphs/" + req.params.graphId + "/dataSet/" + req.params.dataSetId)
      
      /*
         #swagger.responses[200] = {
            description: 'ADDED'
         }
      */
      res.status(200).send(reponse.data.toString());
   } catch (error) {      
      /*
         #swagger.responses[500] = {
            description: 'Return the error message'
         }
      */
      res.status(501).send(error);
   }

   next();

   // #swagger end
});

graphWriterRouter.delete('/graphs/:graphId/dataSet/:dataSetId', [param('graphId').isString(), param('dataSetId').isString()], async (req, res, next) => {
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
      const reponse = await axios.delete(process.env.GRAPHWRITER_ADDR + "/graphs/" + req.params.graphId + "/dataSet/" + req.params.dataSetId)
      
      /*
         #swagger.responses[201] = {
            description: 'REMOVED'
         }
      */
      res.status(200).send(reponse.data.toString());
   } catch (error) {      


      /*
         #swagger.responses[500] = {
            description: 'Return the error message'
         }
      */
      res.status(501).send(error);
   }

   next();
   // #swagger end
});


module.exports = graphWriterRouter;
