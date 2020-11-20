const expect = require('chai').expect;
const low = require('lowdb')
const fileSync = require('lowdb/adapters/FileSync')
const adapter = new fileSync('../../GraphDataBase.json')
const db = low(adapter)
const graphWriterController = require('../controllers/graphWriter')

function pausecomp(millis)
{
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < millis);
}

describe('Add a new graph', () => {

  it('should add a new graph in the database', () => {
    const id = graphWriterController.graphCreation("histogramme");

    db.read()

    const graph = db.get('graph')
      .find({ id: id })
      .value();

    expect(graph.type).to.equal("histogramme");

    graphWriterController.graphDelete(id);

    db.read()

    const graph2 = db.get('graph')
      .find({ id: id })
      .value();

    expect(graph2).to.equal(undefined);
  });
});


