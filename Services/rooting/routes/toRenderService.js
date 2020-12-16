const express = require('express');
const axios = require('axios').default;
const renderRouter = express.Router();
const { param, query, validationResult } = require('express-validator');

renderRouter.get('/graphs/:id/render', [query('type').matches(
   "PNG|JPG|JSON"
), param('id').isInt()]
   , async (req, res, next) => {

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

      if (req.query.type === "JSON") {
         const reponse = await axios.get(process.env.DBREADER_ADDR + "/graphs/" + req.params.id + "/datas");
         /*
         #swagger.responses[200] = {
            description: 'Return a JSON/PNG/JPG, image is in base64 format'
         }
         */

         return res.status(200).send(reponse.data[0].datajson);
      } else {
         const response = await axios.get(process.env.RENDER_ADDR + "/graphs/" + req.params.id + "?type=" + req.query.type)
         return res.status(200).send(response.data);
      }
   });

module.exports = renderRouter;
