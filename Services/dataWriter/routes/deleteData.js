const express = require('express');
const writeDataRouter = express.Router();
const deleteDataSetController = require('../controllers/deleteDataSet');
const { body,param, validationResult } = require('express-validator');

writeDataRouter.delete('/dataSets/:id', [param('id').isInt()], async (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
  }

  try{
    await deleteDataSetController.deleteDataSet(req.params.id);
    return res.status(201).send("The dataSet with id : "+req.params.id + " has been successfully deleted");
  }catch(error){
      return res.status(500).send(error.message)
  }

});


module.exports = writeDataRouter;
