const express = require('express');
const axios = require('axios').default;
const renderRouter = express.Router();
const { param, query, validationResult } = require('express-validator');

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


   const renderServiceName = await (await axios.get(process.env.DBREADER_ADDR + "/graphs/" + req.params.id + "/renderServiceName")).data;

   var address;

   switch (renderServiceName){
      case "XYCharter":
         address = process.env.XYCHARTERRENDER_ADDR;
         break;
      case "QuickChart":
         address = process.env.QUICKCHARTRENDER_ADDR;
         break;
      default:
         res.status(500).send("Render inconnu")
   }

   const reponse = await axios.get(address + "/graphs/" + req.params.id + "?type=" + req.query.type)

   res.setHeader("Content-Type", "image/jpg");
   /*
   #swagger.responses[201] = {
      description: 'Return the image in jpg type'
   }
   */
   res.status(201).send(reponse.data);
   
   next();
});


module.exports = renderRouter;
