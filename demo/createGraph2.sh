#!/bin/bash

dataSetId=$1

rootAddr="http://localhost:4000"
nbData=17
points=()
if [ $# -ne 1 ]
then
    dataSetId=$(curl -s -X POST -H "Content-Type: application/json" -d ' { "name": "testDataSet", "description": "blablabla", "points":[]} ' $rootAddr/dataSets/)
    dataSetId=$(echo $dataSetId | sed -e 's/"//g')
    echo "dataSetId is "$dataSetId

    i=0

    until [ $i -ge $nbData ]
    do
    t=$i
    value=$(expr $RANDOM % 100)
    echo  "add $value at $t" 
    points+=({ \"x\": $t, \"y\": $value })
    pointString=$(echo ${points[@]} | sed -e 's/} {/},{/g')
    echo $pointString
    curl -X PUT -H "Content-Type: application/json" -d ' { "points":['"$pointString"'] }' $rootAddr/dataSets/$dataSetId
    i=`expr $i + 1`
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

cat temp.txt | base64 -d  > result2.jpg

rm temp.txt
