var mongoose = require('mongoose');

var options = {
  user:'',
  pass:'',
  host:'localhost',
  port:'27017',
  dbName:'microblog',
  cookieSecret: 'microblogbyXq'
};

var dbUrl='mongodb://'+options.user+':'+options.pass+'@'+options.host+':'+options.port+'/'+options.dbName;
mongoose.connect(dbUrl);

var db = mongoose.connection;

db.on('error', function callback () {
  console.log("Connection error");
});

db.once('open', function callback () {
  console.log("Mongo working!");
});

exports.getmongoDb = db;
exports.getmonGoose = mongoose;

exports.getdbName = options.dbName;
exports.getCookieSecret = options.cookieSecret;