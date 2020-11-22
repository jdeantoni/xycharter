const express = require('express');
const writeDataRouter = express.Router();
const deleteDataController = require('../controllers/deleteData');

writeDataRouter.delete('/datawriter/:id', async (req, res, next) => {

    try{
      await deleteDataController.deleteData(req.params.id);
      return res.status(200).send("The data with id : "+req.params.id + " has been successfully deleted");
    }catch(error){
        return res.status(404).send(error.name +  " : "+ error.message)
    }

});


module.exports = writeDataRouter;
