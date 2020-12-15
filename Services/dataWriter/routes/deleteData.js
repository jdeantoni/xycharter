const express = require('express');
const writeDataRouter = express.Router();
const deleteDataSetController = require('../controllers/deleteDataSet');
const { body,param, validationResult } = require('express-validator');

writeDataRouter.delete('/datawriter/:idd', [param('idd').isInt()], async (req, res, next) => {
  // #swagger start

  /*
    #swagger.path = '/datawriter/{idd}'
    #swagger.method = 'delete'
    #swagger.description = 'Suppression of a specific dataSet'
    #swagger.parameters['idd'] = {
        in: 'param',
        description: 'The id of the dataSet',
        required: true,
        type: 'integer'
      }
    #swagger.tags = ['DataSets']
  */
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
          /*
         #swagger.responses[400] = {
            description: 'Return the validation error array from express validator'
         }
      */
     return res.status(400).json({ errors: errors.array() });
  }

  try{
    await deleteDataSetController.deleteDataSet(req.params.id);


      /*
         #swagger.responses[201] = {
            description: 'Return "The dataSet with id : {id} has been successfully deleted"'
         }
      */

    return res.status(201).send("The dataSet with id : "+req.params.id + " has been successfully deleted");
  }catch(error){

      /*
         #swagger.responses[500] = {
            description: 'Return the error message'
         }
      */
      return res.status(500).send(error.message)
  }

  // #swagger end
});


module.exports = writeDataRouter;
