// Importing the ORM.

// This creates functions that should connect w/DB.
var orm = require("../config/orm.js");


var bucket = {
  all: function(cb) {
    orm.all("bucket_list", function(res) {
      cb(res);
    });
  },
  // Setting up arrays as columns and vals.
  create: function(cols, vals, cb) {
    orm.create("bucket_list", cols, vals, function(res) {
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    orm.update("bucket_list", objColVals, condition, function(res) {
      cb(res);
    });
  },
  delete: function(objColVals, condition, cb) {
    orm.delete("bucket_list", objColVals, condition, function(res) {
      cb(res);
    });
  }
};


// Export the database functions for the controller. In this case, it's the bucket list controller.
module.exports = bucket;
