const express = require('express');
const axios = require('axios').default;
const dataWriterRouter = express.Router();
const { body,param, validationResult } = require('express-validator');

dataWriterRouter.post('/dataSets', [body("points").isArray()]
   , async(req, res, next) => {	

   const errors = validationResult(req);	
   if (!errors.isEmpty()) {	
      return res.status(400).json({ errors: errors.array() });	
   }	


   try {
      const reponse = await axios.post(process.env.DATAWRITER_ADDR + "/dataSets", req.body )

      res.status(200).send(reponse.data.toString());	      
   } catch (error) {      	
      res.status(501).send(error);	
   }

   next();	
});

dataWriterRouter.delete('/dataSets/:id', [param('id').isInt()], async (req, res, next) => {
   const errors = validationResult(req);	
   if (!errors.isEmpty()) {	
      return res.status(400).json({ errors: errors.array() });	
   }	

   try {
      const reponse = await axios.delete(process.env.DATAWRITER_ADDR + "/dataSets/" + req.params.id);

      res.status(200).send(reponse.data.toString());	      
   } catch (error) {      	
      res.status(501).send(error);	
   }

   next();
});


dataWriterRouter.put('/dataSets/:id', [param('id').isInt()], async (req, res, next) => {

   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   try {
      const reponse = await axios.put(process.env.DATAWRITER_ADDR + "/dataSets/" + req.params.id, req.body)
   
      res.status(201).send("MODIFY");
   } catch (error) {
      res.status(500).send(error.message);
   }
});

dataWriterRouter.get('/dataSets/timeseries', async (req, res, next) => {

   try {
      const reponse = await axios.get(process.env.DATAWRITER_ADDR + "/dataSets/timeseries")
      return res.status(201).json(reponse.data)
   } catch (error) {
      return res.status(501).json(error)
   }
});



dataWriterRouter.post('/dataSets/timeseries', async (req, res, next) => {

   const errors = validationResult(req);
   if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
   }
   
   try {
      const reponse = await axios.post(process.env.DATAWRITER_ADDR + "/dataSets/timeseries", req.body)
      return res.status(201).json(reponse.data)
   } catch (error) {
      return res.status(501).json(error)
   }
});


module.exports = dataWriterRouter;
