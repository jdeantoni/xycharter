const express = require('express');
const axios = require('axios').default;
const dataGraphWriterRouter = express.Router();
const { body,param, validationResult } = require('express-validator');


dataGraphWriterRouter.post('/graphs/:graphId/points', [param('graphId').isInt(), body("points").isArray()]
   , async(req, res, next) => {

   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   try {
      const dataSetId = await (await axios.post(process.env.DATAWRITER_ADDR + "/dataSets", req.body )).data;
      await axios.post(process.env.GRAPHWRITER_ADDR + "/graphs/" + req.params.graphId + "/dataSet/" + dataSetId)
      

      res.status(200).send(dataSetId.toString());
   } catch (error) {      
      res.status(501).send(error);
   }

   next();
});



module.exports = dataGraphWriterRouter;
