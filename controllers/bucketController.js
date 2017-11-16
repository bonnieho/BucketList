var express = require("express");

var router = express.Router();

// bucket.js needs to be imported to use DB functionality.
var bucket = require("../models/bucket.js");

// Here there be dragons (or routes in this case). Just putting things in place in anticipation that specific routes are required,
router.get("/", function(req, res) {
  bucket.all(function(data) {
    var hbsObject = {
      bucket: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/", function(req, res) {
  bucket.create([
    "item", "done", "again"
  ], [
    req.body.item, req.body.done, req.body.again
  ], function() {
    res.redirect("/");
  });
});


router.put("/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  var update = {
    done: req.body.done,
    again: req.body.again
  };
  /* 
  NOT using this because it may not catch that the opposite value should change if a bucket list item gets put back on the "do it again" list. In other words, it leaves the first "done" value and leaves an instance of that item in the Done bucket (as well as putting it in the 'do it again" bucket.')
  if (req.body.done) {
    update = {done: req.body.done};
  } else {
    update = {again: req.body.again};
  }*/

  bucket.update(update, condition, function() {
    res.redirect("/");
  });
});


router.delete("/:id", function(req, res) {
  var condition = "id = " + req.params.id;

console.log("I'm in bucketController.js now");
  console.log("condition", condition);

  bucket.delete(condition, function() {
    res.redirect("/");
  });
});

// server.js needs this exported.
module.exports = router;
