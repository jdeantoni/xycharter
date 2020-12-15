const express = require('express');
const graphWriterRouter = express.Router();
const graphWriterController = require('../controllers/graphWriter');
const { body, param, validationResult } = require('express-validator');

//Création d'un graph
/**
 * @swagger
 * 
 */
graphWriterRouter.post('/graphs', [body('type').matches(
   "histogramme|connectedLine|doughnut|circlePoint|bezierCurve"
)], async(req, res, next) => {
   // #swagger.description = 'Creation of a graph'

   /* #swagger.parameters['type'] = {
               in: 'body',
               description: 'Type of graph created',
               required: true,
               type: 'string',
               format: 'histogramme|connectedLine|doughnut|circlePoint|bezierCurve'
        } */

   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   try {
      const graphId = await graphWriterController.graphCreation(req.body);
   
      res.status(201).send(graphId);
   } catch (error) {
      res.status(500).send(error.message);
   }

   next();
});

//modification d'un graph
graphWriterRouter.put('/graphs/:id', [param('id').isInt()], async (req, res, next) => {

   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   try {
      await graphWriterController.modifyGraph(req.params.id, req.body);
   
      res.status(201).send("MODIFY");
   } catch (error) {
      res.status(500).send(error.message);
   }

   next();
});

//Suppression d'un graph
graphWriterRouter.delete('/graphs/:id', [param('id').isInt()], async (req, res, next) => {

   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   try {
      await graphWriterController.graphDelete(req.params.id);
   
      res.status(201).send("DELETED");
   } catch (error) {
      res.status(500).send(error.message);
   }

   next();
});


module.exports = graphWriterRouter;
