const express = require('express');
const writeTimeSeriesDataRouter = express.Router();
const writeTimeSeries = require('../controllers/writeTimeSeries');
const writeDataSetController = require('../controllers/writeDataSet');
const { body, validationResult } = require('express-validator');


writeTimeSeriesDataRouter.get('/dataSets/timeseries',
    async (req, res, next) => {

   const errors = validationResult(req);
   if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
   }

          /* 
      #swagger.description = 'Create a timeSerie dataSet'
      #swagger.tags = ['DataSets TimeSeries']
      */

    try {
        const id = await writeDataSetController.writeDataSet(req.body.name, req.body.description, "",true)

      /*
         #swagger.responses[201] = {
            description: 'Return the id of the dataSet created'
         }
      */
        return res.status(201).json(id)
    } catch (error) {

      /*
         #swagger.responses[500] = {
            description: 'Return the error message'
         }
      */
        return res.status(500).json(error)
    }
});

writeTimeSeriesDataRouter.post('/dataSets/timeseries',[body("id").isString(),body("timestamp").isInt(), body("value").isInt() || body("value".isBoolean())], async (req, res, next) => {

          /* 
      #swagger.description = 'degeu a refaire !'
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
    
    try {
        console.log("hii"+ req.body.name)
        await writeTimeSeries.writeTimeSeries(req.body.name,req.body.id,req.body.timestamp, req.body.value)
        return res.status(201).json()
    } catch (error) {

      /*
         #swagger.responses[500] = {
            description: 'Return the error message'
         }
      */
        return res.status(500).send(error.message)
    }
});


module.exports = writeTimeSeriesDataRouter;