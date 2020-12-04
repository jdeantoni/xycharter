const express = require('express');
const graphCharaWriterRouter = express.Router();
const graphCharaWriterController = require('../controllers/graphCharaWriter');
const { body, param, validationResult } = require('express-validator');

graphCharaWriterRouter.put('/graphsChara/:graphId', [param('graphId').isInt(), body('characteristics').isString()], async(req, res, next) => {

   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   try {
      const graphId = await graphCharaWriterController.modifyCharas(req.params.graphId, req.body.characteristics);
   
      res.status(201).send(graphId);
   } catch (error) {
      res.status(500).send(error.message);
   }

   next();
});


module.exports = graphCharaWriterRouter;
