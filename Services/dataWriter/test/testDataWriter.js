const expect = require('chai').expect;
const low = require('lowdb')
const fileSync = require('lowdb/adapters/FileSync')
const adapter = new fileSync('./../../GraphDataBase.json')
const db = low(adapter)
const randomPoints = require("./utils/RandomPointUtils")
const writeDataController = require("../controllers/writeData")
const deleteDataController = require("../controllers/deleteData")

const pointsData =  randomPoints.generateRandomPoint2D(100, 1000)

describe('Add points', function () {

    it('should store the data into the database', async () => {

        const idData = await writeDataController.writeData(pointsData)
        db.read()
        let writtenData = await db.get("graphPoints").find({ id: idData }).value()
        expect(writtenData).to.not.equal(undefined)
        expect(writtenData.id).to.equal(idData)

        db.get("graphPoints").remove({id:idData}).write();
    })

});

describe('Delete points', function () {

    it('should delete the data in the database', async () => {

        
        const idData = await writeDataController.writeData(pointsData)
        db.read()
        await deleteDataController.deleteData(idData)
        db.read()
        let writtenData = await db.get("graphPoints").find({ id: idData }).value()
        expect(writtenData).to.equal(undefined)

    })

});