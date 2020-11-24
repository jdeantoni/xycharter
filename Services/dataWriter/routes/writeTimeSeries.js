const express = require('express');
const writeDataRouter = express.Router();
const writeTimeSeries = require('../controllers/writeTimeSeries');

const { body, validationResult } = require('express-validator');

writeDataRouter.post('/datawriter/timeseries',[body("id").isString()], async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        await writeTimeSeries.writeTimeSeries(req.body.id, req.body.point)
        return res.status(201).send()
    } catch (error) {
        return res.status(500).send(error)
    }
});


module.exports = writeDataRouter;
