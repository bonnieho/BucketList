var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var path = require("path");

var app = express();
// Sets an initial port. We'll use this later in our listener
var port = process.env.PORT || 3000;

// Don't forget that "public" directory holds all static content.
app.use(express.static("public"));


// to translate this, 'extended' allows you to parse full objects.

/* With 'false' the URL-encoded data is parsed with the querystring library.
Extended protocol uses qs library to parse x-www-form-urlencoded data. The main advantage of qs is that it uses very powerful serialization/deserialization algorithm, capable of serializing any json-like data structure.

But web-browsers don't normally use this protocol, because x-www-form-urlencoded was designed to serialize flat html forms. Though, it may come in handy if you're going to send rich data structures using ajax.

querystring library` provides basic serialization/deserialization algorithm, the one used by all web-browsers to serialize form data. This basic algorithm is significantly simpler than extended one, but limited to flat data structures.

Both algorithms work exactly the same with flat data.

Now, when you know pros and cons of both algorithms, it's up to you to decide which one suits your application better.
Courtesy of StackOverflow post authored by Leonid Beschastny. */
app.use(bodyParser.urlencoded({ extended: false }));


// Override with POST having ?_method=DELETE
/* This lets us use the DELETE method in the form tag's action attribute. Following the name/value pair with method="POST" is the secret sauce that ultimately deletes the record from the db's table! */
app.use(methodOverride("_method"));

// Handlebars schtuff.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
partialsDir="views/partials/"


// Routes get imported here.
var routes = require("./controllers/bucketController.js");

app.use("/", routes);


// =============================================================================
// LISTENER
// The below code effectively "starts" our server
// =============================================================================

app.listen(port, function() {
  console.log("App listening on PORT: " + port);
});
