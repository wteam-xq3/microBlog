var settings = require('./settings');
var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;

module.exports = new Db(
  settings.dbName, 
  new Server(settings.host, Connection.DEFAULT_PORT, {})
);