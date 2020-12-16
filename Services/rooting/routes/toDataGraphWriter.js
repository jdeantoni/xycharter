const express = require('express');
const axios = require('axios').default;
const dataGraphWriterRouter = express.Router();
const { body,param, validationResult } = require('express-validator');


dataGraphWriterRouter.post('/graphs/:graphId/points', [param('graphId').isInt(), body("points").isArray()]
   , async(req, res, next) => {

      /* 
  #swagger.description = 'Create a dataSet and add it to the graph automaticaly'
  #swagger.tags = ['DataSets', 'Graphs']
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
      const dataSetId = await (await axios.post(process.env.DATAWRITER_ADDR + "/dataSets", req.body )).data;
      await axios.post(process.env.GRAPHWRITER_ADDR + "/graphs/" + req.params.graphId + "/dataSet/" + dataSetId)
      

      /*
         #swagger.responses[201] = {
            description: 'Return the dataSet id'
         }
      */
      res.status(200).send(dataSetId.toString());
   } catch (error) {      

      /*
         #swagger.responses[501] = {
            description: 'Return the error message'
         }
      */
      res.status(501).send(error);
   }

   next();
});



module.exports = dataGraphWriterRouter;
