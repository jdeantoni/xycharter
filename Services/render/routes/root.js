const express = require('express');
const axios = require('axios').default;
const renderRouter = express.Router();
const { param, query, validationResult } = require('express-validator');

renderRouter.get('/graphs/:id', [query('type').matches(
   "PNG|JPG"
), param('id').isInt()]
   , async (req, res, next) => {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }


      const renderServiceName = await (await axios.get(process.env.DBREADER_ADDR + "/graphs/" + req.params.id + "/renderServiceName")).data;

      var address;

      switch (renderServiceName) {
         case "XYCharter":
            address = process.env.XYCHARTERRENDER_ADDR;
            break;
         case "QuickChart":
            address = process.env.QUICKCHARTRENDER_ADDR;
            break;
         default:
            res.status(500).send("Render inconnu")
      }

      await axios.get(address + "/graphs/" + req.params.id + "?type=" + req.query.type, {
         responseType: 'arraybuffer'
      }).then(response => {

         const responseBase64 = Buffer.from(response.data, 'binary').toString('base64')
         res.status(201).send({ data: `data:${response.headers['content-type'].toLowerCase()};base64,${responseBase64}` });
         next();
      });

   });

renderRouter.get('/ping'
   , async (req, res, next) => {

      return res.status(200).send("ok");

   });

module.exports = renderRouter;
