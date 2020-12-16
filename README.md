# XY Charter - TER Equipe 13

# User Manual
- [How to create a new chart](#Example-of-how-to-create-a-new-chart) 
- [How to create a new data](#Example-of-how-to-add-new-data) 
- [How to create a timeseries data](#Example-of-how-to-add-timeseries-data) 
- [How to add data in a chart](#Example-of-how-to-add-data-in-a-chart) 
- [How to visualize a chart](#Example-of-how-to-visualize-a-chart) 
##  Chart

There is four different types of chart that you can create with the API 
#### connectedLine
-- image
#### bezierCurve
-- image
#### circlePoint
-- image
#### doughnut
-- image

## Example of how to create a new chart 
**URL**
```json
    HTTP : POST http://URLAPI/graphs
```

**body**
```json
{
    "name": "exampleGraph",
    "type": "bezierCurve"
}
```
**Response** 
```json
    "1"
```
**Important :** Save the id of the graph created, it will be used in other request to  manipulate the chart

## Example of how to add new data
- #### How to add data for connectedLines/bezierCurve/circlePoints
    **URL**
    ```json
        HTTP : POST http://URLAPI/dataSets
    ```
    **body**
    ```json
    {
        "name" : "exampleData",
        "points" : [{"x": 20,"y":15},{"x": 5,"y":10}]
    }
    ```
    **Response** 
    ```json
        "1" 
    ```
    ***Important :*** Save the id of the dataset created, it will be used in other request to  manipulate this data 
    
	


- #### Example of how to add new data for doughnut
- **URL**
    ```json
        HTTP : POST http://URLAPI/dataSets
    ```
    **body**
    ```json
    {
        "name" : "exampleDataDoughnut",
        "points" : [{"label": "January","value":15},{"label": "October","value":10}]
    }
    ```
    **Response** 
    ```json
        "1" 
    ```
    ***Important :*** Save the id of the dataset created, it will be used in other request to  manipulate this data 
    
## Example of how to add timeseries data
### 1 - Get a key
- **URL**
    ```json
        HTTP : POST http://URLAPI/dataSets/timeseries
    ```
    **Response** 
    ```json
        "1" 
    ```
    ***Important :*** Save the id of the dataset created, it will be used in other request to  manipulate this data
### 2 - Add data with the key
- **URL**
    ```json
        HTTP : POST http://URLAPI/dataSets/timeseries
    ```
    **body**
    ```json
    {
        "name" : "exampleDataTimeSeries",
        "id" : "1",
        "timestamp": 1608128325,
        "value" : 152
    }
    ```
    
## Example of how to add data in a chart

In this section we will see how we can add data in a chart previously created.

To add data in chart we need the **id of the graph** and the **id of the dataset**
- **URL**
    ```json
        HTTP : POST http://URLAPI/graphs/1/dataSet/1
    ```
    **Response** 
    ```json
        "ADDED" 
    ```
    
We should see in the response "ADDED" to be sure that the datasets has been added to the graph

## Example of how to visualize a chart

- **URL**
    ```json
        HTTP : GET http://URLAPI/graphs/1/render?type=JPG
    ```
    **Response** 
    ```json
        "{jpg in base64}" 
    ```
The response will be the image jpg encoded in base 64