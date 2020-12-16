const app = require('express')()
const http = require('http')
const swaggerUi = require('swagger-ui-express')
const swaggerAutogen = require('swagger-autogen')()


const outputFile = './swagger/swagger_output.json'
const endpointsFiles = ['./routes/toGraphWriter.js', './routes/toDataWriter.js', './routes/toDataGraphWriter.js', './routes/toDatabaseReader.js', './routes/toRenderService.js']

const doc = {
    info: {
        version: "1.0.0",
        title: "Graph API",
        description: "This API can create chart from dataSets"
    },
    host: "localhost:3000",
    basePath: "/",
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    definitions: {
        graph: {
            name : "Super graph !",
            description: "A super graph",
            type : "circlePoint",
            showX:true,
            showGrid:true,
            xBounds:{lowerBound: 10, upperBound: 15.54},
            xLegend:"My x axe",
            graphLegend:"My legend",
            backgroundColor:{r:12,g:13,b:14,a:15},
            gridColor:{r:12,g:13,b:14,a:15}
        },
        points: [
            {
                "x": 307,
                "y": 22
            },
            {
                "x": 610,
                "y": 135
            },
            {
                "x": 750,
                "y": 602
            }
        ],
        dataSet : {
            name: "dataSet name",
            description: "dataSet description",
            points: [
                {
                  "label": "January",
                  "value": 50
                },
                {
                  "label": "February",
                  "value": 60
                },
                {
                  "label": "March",
                  "value": 70
                },
                {
                  "label": "April",
                  "value": 180
                },
                {
                  "label": "May",
                  "value": 190
                }
            ]
        },
        dataSetRead: {
          "iddataset": 1,
          "name": "myDataSet",
          "description": "It's my dataSet",
          "creationdate": "2020-12-10T08:02:06.680Z",
          "datajson": "[{\"label\":\"January\",\"value\":20},{\"label\":\"February\",\"value\":60},{\"label\":\"March\",\"value\":70},{\"label\":\"April\",\"value\":180},{\"label\":\"May\",\"value\":290}]"
        },
        allDatas: [
          {
              "datajson": "[{\"label\":\"January\",\"value\":50},{\"label\":\"February\",\"value\":60},{\"label\":\"March\",\"value\":70},{\"label\":\"April\",\"value\":180},{\"label\":\"May\",\"value\":190}]"
          },
          {
              "datajson": "[{\"label\":\"January\",\"value\":20},{\"label\":\"February\",\"value\":60},{\"label\":\"March\",\"value\":70},{\"label\":\"April\",\"value\":180},{\"label\":\"May\",\"value\":290}]"
          },
          {
              "datajson": "[{\"label\":\"June\",\"value\":20},{\"label\":\"February\",\"value\":60},{\"label\":\"March\",\"value\":70},{\"label\":\"April\",\"value\":180},{\"label\":\"May\",\"value\":290}]"
          }
        ],
        graphTypes: [
          {
              "idgraphtype": 1,
              "graphtype": "histogramme",
              "servicename": "XYCharter"
          },
          {
              "idgraphtype": 2,
              "graphtype": "connectedLine",
              "servicename": "XYCharter"
          },
          {
              "idgraphtype": 3,
              "graphtype": "doughnut",
              "servicename": "QuickChart"
          }
          ]
    }
}


swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    const swaggerFile = require('./swagger_output.json')
    
    http.createServer(app).listen(3000)
    console.log("Listening at:// port:%s (HTTP)", 3000)
    
    app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
})