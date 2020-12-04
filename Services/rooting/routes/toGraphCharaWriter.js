const express = require('express');
const axios = require('axios').default;
const graphCharaWriterRouter = express.Router();
const { body,param, validationResult } = require('express-validator');
const { graphCharaValidator } = require('../controllers/graphCharaValidator.js');


graphCharaWriterRouter.put('/graphsChara/:graphId', [param('graphId').isInt(), body('characteristics').isString()], async(req, res, next) => {

   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }
   const errorsInCharacteristics = graphCharaValidator(req);
   if (errorsInCharacteristics.length != 0) {
      return res.status(400).json({ errors: errorsInCharacteristics });
   }

   try {
      const reponse = await axios.put(process.env.GRAPHWRITER_ADDR + "/graphsChara/" + req.params.graphId, req.body)


      res.status(200).send(reponse.data);
   } catch (error) {
      res.status(501).send(error);
   }

   next();
});


module.exports = graphCharaWriterRouter;
