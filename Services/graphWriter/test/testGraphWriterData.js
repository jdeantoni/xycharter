const expect = require('chai').expect;
const low = require('lowdb')
const fileSync = require('lowdb/adapters/FileSync')
const adapter = new fileSync('../../GraphDataBase.json')
const db = low(adapter)
const graphWriterController = require('../controllers/graphWriter')
const graphWriterDataController = require('../controllers/graphWriterData')

describe('Add a new graph', () => {

  it('should add a new data in a graph in the database', () => {
    const id = graphWriterController.graphCreation("histogramme");

    const dataId = "ID-3";

    graphWriterDataController.graphAddData(id, dataId);

    db.read()

    const graph = db.get('graph')
      .find({ id: id })
      .value();

    expect(graph.datasId).that.contain(dataId);

    graphWriterDataController.graphDeleteData(id, dataId);

    db.read()

    const graph2 = db.get('graph')
      .find({ id: id })
      .value();

    expect(graph2.datasId).that.not.contain(dataId);

    graphWriterController.graphDelete(id);
  });
});


