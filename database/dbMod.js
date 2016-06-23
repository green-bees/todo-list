// /**
//  * Created by kevin on 6/23/2016.
//  */

var databaseConnector = {};

databaseConnector.connect = function(callback) {
  var MongoClient = require('mongodb').MongoClient;
  var url = 'mongodb://admin:password@ds023064.mlab.com:23064/green_bees_to-do';

  MongoClient.connect(url, function(err, db) {
    if(err) {
      console.log(err);
    } else {
      console.log('Database connected.');
      callback(db);
    }
  });
}

module.exports = databaseConnector;
