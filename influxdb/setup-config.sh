#!/bin/sh

## Create basic config in the db
touch config.json

curl --request POST 'http://localhost:8086/api/v2/setup' \
     --data '{
                "username": "admin",
                "password": "root123456",
                "org": "data-org",
                "bucket": "datagraph",
                "retentionPeriodHrs": 0
                }' \
    >> config.json