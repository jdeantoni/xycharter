# Influx DB

This database is use to stock all time series data

## Configuration
- **username** : will be used by services to read and write data
- **password** : password to connect to the admin session
- **bucket** : named location where time series data is stored
- **retentionPeriodHrs** : a duration of time that each data point persists
- **org** : An organization is a workspace for a group of users


```json
{
    "username": "admin",
    "password": "root123456",
    "org": "data-org",
    "bucket": "datagraph",
    "retentionPeriodHrs": 0
}
```

## Init config of influxdb 
***Important :**  the server of influx need to be started before using this command*

***Default hostname:**  localhost*
***Default port:**  8086*
```bat
$ sh setup-config.sh --host {hostname} --port {port}