# Influx db config
## Config.json
- **username** : will be used by services to read and write data
- **password** : password to connect to the admin session
- **bucket** : named location where time series data is stored
- **retentionPeriodHrs** : a duration of time that each data point persists
- **org** : An organization is a workspace for a group of users

## Init config of influxdb 
***Important :**  the server of influx need to be started before using this command*

***Default hostname:**  localhost*
***Default port:**  8086*
```bat
$ sh setup-config.sh --host {hostname} --port {port}