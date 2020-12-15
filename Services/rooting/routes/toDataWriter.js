const express = require('express');
const axios = require('axios').default;
const dataWriterRouter = express.Router();
const { body,param, validationResult } = require('express-validator');

dataWriterRouter.post('/datawriter', [body("points").isArray()]
   , async(req, res, next) => {	

   const errors = validationResult(req);	
   if (!errors.isEmpty()) {	
      return res.status(400).json({ errors: errors.array() });	
   }	


   try {
      const reponse = await axios.post(process.env.DATAWRITER_ADDR + "/datawriter", req.body )

      res.status(200).json(reponse.data.toString());	      
   } catch (error) {      	
      res.status(501).json(error);	
   }

   next();	
});

dataWriterRouter.delete('/datawriter/:id', [param('id').isInt()], async (req, res, next) => {
   const errors = validationResult(req);	
   if (!errors.isEmpty()) {	
      return res.status(400).json({ errors: errors.array() });	
   }	

   try {
      const reponse = await axios.delete(process.env.DATAWRITER_ADDR + "/datawriter/" + req.params.id);

      res.status(200).json(reponse.data.toString());	      
   } catch (error) {      	
      res.status(501).json(error);	
   }

   next();
});


dataWriterRouter.put('/datawriter/:id', [param('id').isInt()], async (req, res, next) => {

   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   try {
      const reponse = await axios.put(process.env.DATAWRITER_ADDR + "/datawriter/" + req.params.id, req.body)
   
      res.status(201).json("MODIFY");
   } catch (error) {
      res.status(500).json(error.message);
   }
});

dataWriterRouter.get('/datas/timeseries', async (req, res, next) => {
   try {
      const response = await axios.get(process.env.DATAWRITER_ADDR + "/datawriter/timeseries")
      res.status(201).json(response.data)
   } catch (error) {
       res.status(501).json(error)
   }
   next()
});



dataWriterRouter.post('/datas/timeseries', async (req, res, next) => {

   const errors = validationResult(req);
   if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
   }
   
   try {
      const reponse = await axios.post(process.env.DATAWRITER_ADDR + "/datawriter/timeseries", req.body)
      return res.status(201).json(reponse.data)
   } catch (error) {
      return res.status(501).json(error)
   }
});


module.exports = dataWriterRouter;
