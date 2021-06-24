#!/bin/bash

dataSetId=$1

rootAddr="http://localhost:4000"
nbData=17

if [ $# -ne 1 ]
then
    dataSetId=$(curl -X GET $rootAddr/dataSets/timeseries)
    dataSetId=$(echo $dataSetId | sed -e 's/"//g')
    echo "dataSetId is "$dataSetId

    i=0

    until [ $i -ge $nbData ]
    do
    t=$(date +"%s")
    value=$(expr $RANDOM % 100)
    echo  "add $value at $t" 
    curl -s -X POST -H "Content-Type: application/json" -d ' { "name": "dataSetTimeSeries", "id": "'$dataSetId'", "timestamp": '$t', "value": '$value'} ' $rootAddr/dataSets/timeseries
    i=`expr $i + 1`
    sleep 2
    done

else 
    echo "provided dataSetId is "$dataSetId
fi




graphId=$(curl -X POST -H "Content-Type: application/json" -d ' { "name": "exampleGraph2", "type": "connectedLine", "showGrid" : false, "showX" : true, "showY" : true, "xBounds" : {"lowerBound": 0, "upperBound" : '$nbData'}, "graphLegend": "my testing plot", "xLegend" : "time" } ' $rootAddr/graphs)
echo "graphId is "$graphId
curl -X POST $rootAddr/graphs/$graphId/dataSet/$dataSetId

curl -X GET $rootAddr/graphs/$graphId/render?type=JPG >resultTemp.json

cat resultTemp.json |sed -e 's#{\"data\":\"data:image/jpeg;base64,##' |sed -e 's/\"}//' > temp.txt

rm resultTemp.json

cat temp.txt | base64 -d  > result.jpg

rm temp.txt
