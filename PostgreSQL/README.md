# PostgreSQL DB

This database is use to stock all information except time series data

## Configuration

```json
{	
    "user" : "testing",
    "host" : "postgres",
    "database" : "graphs",
    "password": "bla123",
    "port": 5432
}
```

## Architecture

```sql
CREATE TABLE GraphType(
    idGraphType  SERIAL PRIMARY KEY,
    graphType  VARCHAR(20),
    serviceName VARCHAR(40)
);

CREATE TABLE Graphs (
    idGraph SERIAL PRIMARY KEY,
    name varchar(20) NOT NULL,
    description text,
    creationDate timestamp,
    idGraphType int NOT NULL,
    characteristics text NOT NULL,

    CONSTRAINT fk_graphType
        FOREIGN KEY (idGraphType) REFERENCES GraphType(idGraphType)
);

CREATE TABLE DataSets (
    idDataset SERIAL PRIMARY KEY,
    name varchar(20) NOT NULL,
    description text,
    creationDate timestamp,
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
```