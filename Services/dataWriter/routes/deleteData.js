const express = require('express');
const writeDataRouter = express.Router();
const deleteDataSetController = require('../controllers/deleteDataSet');

writeDataRouter.delete('/datawriter/:id', async (req, res, next) => {

    try{
      await deleteDataSetController.deleteDataSet(req.params.id);
      return res.status(201).send("The dataSet with id : "+req.params.id + " has been successfully deleted");
    }catch(error){
        return res.status(500).send(error.message)
    }

});


module.exports = writeDataRouter;
