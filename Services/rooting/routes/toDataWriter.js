const express = require('express');
const axios = require('axios').default;
const dataWriterRouter = express.Router();
const { body,param, validationResult } = require('express-validator');

writeTimeSeriesDataRouter.get('/datas/timeseries', async (req, res, next) => {

   try {
      const reponse = await axios.get(process.env.DATAWRITER_ADDR + "/datawriter/timeseries")
      return res.status(201).send(reponse.data)
   } catch (error) {
      return res.status(501).send(error)
   }
});

writeTimeSeriesDataRouter.post('/datas/timeseries/:id',[param("id").isString(),body("timestamp").isInt(),body("data").isInt()], async (req, res, next) => {

   const errors = validationResult(req);
   if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
   }
   
   try {
      const reponse = await axios.get(process.env.DATAWRITER_ADDR + "/datawriter/timeseries", {"id" : req.param.id, "timestamp" : req.body.timestamp, "value" : req.body.data})
      return res.status(201).send(reponse.data)
   } catch (error) {
      return res.status(501).send(error)
   }
});


module.exports = dataWriterRouter;
