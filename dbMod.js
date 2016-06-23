/**
 * Created by kevin on 6/23/2016.
 */

var mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;

var url = 'admin:password@ds023064.mlab.com:23064/green_bees_to-do';

MongoClient.connect(url, function (err, db) {
    if (err) {
        console.log('Unable to connect. Error: ', err);
    } else {
        console.log('Connection established to ', url);

        //do our work
        // create tasks collection
        var collection = db.collection('tasks');

        //create tasks
        var task1 = {"task": "Get Groceries", "importance": 1, "completed": false};
        var task2 = {"task": "Walk the Dog", "importance": 1, "completed": false};
        var task3 = {"task": "Mail Letters", "importance": 1, "completed": false};

        //insert tasks
        collection.insert([task1,task2,task3],function (err,result) {
            if (err) {
                console.log(err);
            } else {
                console.log('Inserted %d tasks into the "tasks" collection. The tasks inserted with "_id" are: ', result.length,result);
            }


            db.close();
        });
    }
});