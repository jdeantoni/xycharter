const express = require('express');
const axios = require('axios').default;
const renderRouter = express.Router();
const { param, query, validationResult } = require('express-validator');

renderRouter.get('/graphs/:id', [query('type').matches(
   "PNG|JPG"
), param('id').isInt()]
   , async(req, res, next) => {

   const errors = validationResult(req);
   if (!errors.isEmpty()) {
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
   res.status(201).send(reponse.data);
   
   next();
});


module.exports = renderRouter;
