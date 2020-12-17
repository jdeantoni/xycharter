const express = require('express');
const axios = require('axios').default;
const dataWriterRouter = express.Router();
const { body,param, validationResult } = require('express-validator');

dataWriterRouter.post('/dataSets', [body("points").isArray()]
   , async(req, res, next) => {	
   /* 
    #swagger.path = '/dataSets/'
   #swagger.description = 'Create a dataSet'
   #swagger.parameters['points'] = {
      in: 'body',
      description: 'Point of the dataSet',
      required: true,
      type: 'object',
      schema: { $ref: "#/definitions/points" }
      }
   #swagger.tags = ['DataSets']
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
      const reponse = await axios.post(process.env.DATAWRITER_ADDR + "/dataSets", req.body )

      /*
      #swagger.responses[201] = {
            description: 'Return the id of the new dataSet'
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
});


dataWriterRouter.put('/dataSets/:id', [param('id').isInt()], async (req, res, next) => {
   /* 
    #swagger.path = '/dataSets/{dataSetId}'
   #swagger.description = 'Modify a specific dataSet'
   #swagger.parameters['id'] = {
      in: 'param',
      description: 'The id of the dataSet to modify',
      required: true,
      type: 'integer'
      }
   #swagger.parameters['information to modify'] = {
      in: 'body',
      description: 'Element of the dataSet to modify',
      required: true,
      type: 'object',
      schema: { $ref: "#/definitions/dataSet" }
      }
   #swagger.tags = ['DataSets']
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
      const reponse = await axios.put(process.env.DATAWRITER_ADDR + "/dataSets/" + req.params.id, req.body)
   
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
});


dataWriterRouter.delete('/dataSets/:id', [param('id').isInt()], async (req, res, next) => {
  /*
    #swagger.path = '/dataSets/{id}/'
    #swagger.method = 'delete'
    #swagger.description = 'Suppression of a specific dataSet'
    #swagger.parameters['idd'] = {
        in: 'param',
        description: 'The id of the dataSet',
        required: true,
        type: 'integer'
      }
    #swagger.tags = ['DataSets']
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
      const reponse = await axios.delete(process.env.DATAWRITER_ADDR + "/dataSets/" + req.params.id);

      /*
         #swagger.responses[201] = {
            description: 'Return "The dataSet with id : {id} has been successfully deleted"'
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
});

dataWriterRouter.get('/dataSets/timeseries', async (req, res, next) => {
          /* 
      #swagger.description = 'Create a timeSerie dataSet'
      #swagger.tags = ['DataSets']
      */
   try {
      const reponse = await axios.get(process.env.DATAWRITER_ADDR + "/dataSets/timeseries")
      
      /*
         #swagger.responses[201] = {
            description: 'Return the id of the dataSet created'
         }
      */
      return res.status(201).json(reponse.data)
   } catch (error) {

      /*
         #swagger.responses[501] = {
            description: 'Return the error message'
         }
      */
      return res.status(501).json(error)
   }
});



dataWriterRouter.post('/dataSets/timeseries', [body("id").isString(),body("timestamp").isInt()], async (req, res, next) => {

   // #swagger start
    /* 
    #swagger.path = '/dataSets/timeseries/'
    #swagger.method = 'post'
    #swagger.description = 'Modify a timeSerie dataSet'
    #swagger.parameters['id'] = {
      in: 'body',
      description: 'The id of the dataSet to modify',
      required: true,
      type: 'integer'
    }
    #swagger.parameters['timestamp'] = {
      in: 'body',
      description: 'The timestamp of the data',
      required: true,
      type: 'integer'
    }
    #swagger.parameters['value'] = {
      in: 'body',
      description: 'The value of the data (int or boolean)',
      required: true,
      type: 'object'
    }
    #swagger.tags = ['DataSets']
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
      const reponse = await axios.post(process.env.DATAWRITER_ADDR + "/dataSets/timeseries", req.body)
      
      /*
         #swagger.responses[201] = {
         }
      */
      return res.status(201).json(reponse.data)
   } catch (error) {

      /*
         #swagger.responses[501] = {
            description: 'Return the error message'
         }
      */
      return res.status(501).json(error)
   }
});


module.exports = dataWriterRouter;
