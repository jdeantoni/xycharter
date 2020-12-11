const express = require('express');
const renderRouter = express.Router();
const { param, query, validationResult } = require('express-validator');
const doughnutRender = require('../controllers/doughnut');
const axios = require('axios').default;

renderRouter.get('/graphs/:id', [query('type').matches(
   "PNG|JPG"
), param('id').isInt()]
   , async(req, res, next) => {

   const errors = validationResult(req);
   if (!errors.isEmpty()) {
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
   res.status(201).send(reponse);
   
   next();
});


module.exports = renderRouter;
