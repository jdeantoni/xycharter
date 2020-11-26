CREATE TABLE Graphs (
    idGraph SERIAL PRIMARY KEY,
    Type VARCHAR(20)
);

CREATE TABLE DataSets (
    idDataset SERIAL PRIMARY KEY,
    timeseries BOOLEAN,
    DataJSON TEXT
);

CREATE TABLE LinkDataSetGraph (
    idGraph int NOT NULL,
    idDataset int NOT NULL,

    PRIMARY KEY(idDataset, idGraph),
    CONSTRAINT fk_dataSet
      FOREIGN KEY(idDataset)
          REFERENCES DataSets(idDataset),
    CONSTRAINT fk_graph
      FOREIGN KEY(idGraph)
          REFERENCES Graphs(idGraph)
);
