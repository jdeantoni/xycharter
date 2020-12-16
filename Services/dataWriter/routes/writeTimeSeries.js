const express = require('express');
const writeTimeSeriesDataRouter = express.Router();
const writeTimeSeries = require('../controllers/writeTimeSeries');
const writeDataSet = require('../controllers/writeDataSet');
const { body, validationResult } = require('express-validator');


writeTimeSeriesDataRouter.get('/datawriter/timeseries', async (req, res, next) => {

          /* 
      #swagger.description = 'Create a timeSerie dataSet'
      #swagger.tags = ['DataSets TimeSeries']
      */

    try {
        const id = await writeDataSet.writeDataSetIdTimeSeries(true)

      /*
         #swagger.responses[201] = {
            description: 'Return the id of the dataSet created'
         }
      */
        return res.status(201).send(id)
    } catch (error) {

      /*
         #swagger.responses[500] = {
            description: 'Return the error message'
         }
      */
        return res.status(500).send(error)
    }
});

writeTimeSeriesDataRouter.post('/datawriter/timeseries',[body("name").isString(),body("id").isString(),body("timestamp").isInt()||body("value").isInt()], async (req, res, next) => {

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
        await writeTimeSeries.writeTimeSeries(req.body.name,req.body.id,req.body.timestamp, req.body.value)
        return res.status(201).send()
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