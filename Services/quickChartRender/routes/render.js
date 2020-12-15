const express = require('express');
const renderRouter = express.Router();
const { param, query, validationResult } = require('express-validator');
const doughnutRender = require('../controllers/doughnut');
const axios = require('axios').default;

renderRouter.get('/graphs/:id', [query('type').matches(
   "PNG|JPG"
), param('id').isInt()]
   , async(req, res, next) => {

   /* 
      #swagger.description = 'Get a render for the graph'
      #swagger.parameters['id'] = {
         in: 'param',
         description: 'The id of the graph',
         required: true,
         type: 'integer'
        }
      #swagger.parameters['type'] = {
         in: 'query',
         description: 'type of render (JPG|PNG)',
         required: true,
         type: 'string'
        }
      #swagger.tags = ['Render']
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


   const graphCharas = await (await axios.get(process.env.DBREADER_ADDR + "/graphs/" + req.params.id)).data[0];

   var reponse;

   switch (graphCharas.graphtype){
      case "doughnut":
         reponse = await doughnutRender.renderFromQC(req.params.id, graphCharas.characteristics);
         break;
   }
   

   res.setHeader("Content-Type", "image/jpg");
   /*
   #swagger.responses[201] = {
      description: 'Return the image in jpg type'
   }
   */
   res.status(201).send(reponse);
   
   next();
});


module.exports = renderRouter;
