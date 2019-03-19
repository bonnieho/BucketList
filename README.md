# BucketList - an exercise showcasing Node.js, Express, and Handlebars
## (a.k.a. "Eat-Da-Burger")

Published site: [https://bonnieho-bucketlist.herokuapp.com/](https://bonnieho-bucketlist.herokuapp.com/)

### Overview

The original assigned task was to create a "burger logger" (WTH?!?) to enter a customized burger into a list and then have whichever burger you specify to be "devoured" (read: being transfered to an "eaten" list). This was to be done through the use of Node and mySQL to route that data and update the underlying database. No html files were to be harmed as Handlebars is the technology called upon to render the resulting pages based on a series of templates as linked views.

Since the entire cohort was tasked with this same exercise, I wanted to have something more unique to show as exemplary of my ability to implement the same MVC design patten using the homegrown ORM needed for this assignment. So, I improvised and applied the same requirements into a different type of list to categorize - a "bucket" list.


### The Blueprint

* BucketList is a listing app that lets users input items that they'd like to accomplish at some point in their lives.

* When a user submits an item that they'd like to accomplish, it will display that task on the left side of the page in a container labeled "What's still to do", waiting to be accomplished.

* Each task in the Bucket List area also has a `Done!` button. When the user clicks it, the item will move to the right side of the page, into a list of completed tasks (a container labeled "Stuff I've done").

* The app stores every task in a database, whether completed or not.

* **(Bonus feature that I've added to my project)** Additionally, I've added a third list where a user can decide that if they enjoyed a specific completed task enough, they can click an accomplanying button associated with that task and choose to move it to a third list for activities that were enjoyable enough to do again (a container called "Hey, that was fun - let's do it again!").

(screenshot of BucketList page)

- - - 

#### App setup steps

1. `BucketList` GitHub repo was intialized.

2. A **package.json** file was created by running `npm init`.

3. Installed the **Express npm package** using: `npm install express --save`.

4. Created a **server.js** file (at root).

5. Installed the **Handlebars npm package** using: `npm install express-handlebars --save`.

6. Installed the **method-override npm package** using: `npm install method-override --save`. *(This lets us use the DELETE method in the form tag's action attribute.)*

7. Installed the **body-parser npm package** using: `npm install body-parser --save`.

8. Installed **MySQL npm package** using: `npm install mysql --save`.

9. Required the following npm packages inside of the **server.js** file:
   * *express*
   * *method-override*
   * *body-parser*

&#160;

#### DB setup steps

1. A folder named **db** was created in the **BucketList** directory.

2. In the **db** folder, a **schema.sql** file was created to initialize the one table (*bucket_list*) in this `bucket_db` database. The following SQL queries are contained in this schema file:

   * Created the `bucket_db`.
   * switch to or using the `bucket_db`.
   * Created a *bucket_list* table with these fields:
     * **id**: an auto incrementing int that serves as the primary key.
     * **item**: a string.
     * **done**: a boolean.
     * **again**: a boolean.

3. Also in the **db** folder, a **seeds.sql** file was created. In this file, insert queries were written to populate the *bucket_list* table with several entries including some that have marked as having already been accomplished.

4. Both **schema.sql** and **seeds.sql** files were run from the command line to initialize the database in the mysql server.

&#160;

#### Config setup steps

1. Inside the **BucketList** directory, a folder named **config** was created.

2. A **connection.js** file was created inside the **config** directory.

   * Inside the **connection.js** file, code was set up to connect Node to MySQL.
   
    ~~~~
    var mysql = require("mysql");
    var connection;

    if (process.env.JAWSDB_URL) {
      connection = mysql.createConnection(process.env.JAWSDB_URL);
    } else {
      connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "-------",
        database: "-------"
      });
    };
    ~~~~
    
    * That new connection was then exported.

```
    // Export connection for ORM to use.
    module.exports = connection;
```

&#160;

3. An **orm.js** file was also created inside the **config** directory.

  * The **connection.js** was set as a required import into **orm.js** file.

  * In the **orm.js** file, methods were created that execute the necessary MySQL commands in the controllers. These are the methods that were used to retrieve and store data in the database.

    * **`selectAll()`**

    ~~~~ 
    all: function(tableInput, cb) {
      var queryString = "SELECT * FROM " + tableInput + ";";
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
        cb(result);
      });
    },
    ~~~~

    * **`insertOne()`**

    ~~~~
    create: function(table, cols, vals, cb) {
      var queryString = "INSERT INTO " + table;

      queryString += " (";
      queryString += cols.toString();
      queryString += ") ";
      queryString += "VALUES (";
      queryString += printQuestionMarks(vals.length);
      queryString += ") ";

      console.log("just created new record in ORM");
      console.log(queryString);

      connection.query(queryString, vals, function(err, result) {
        if (err) {
          throw err;
        }
        cb(result);
      });
    },
    ~~~~

    * **`updateOne()`**
 
    ~~~~
    update: function(table, objColVals, condition, cb) {
      var queryString = "UPDATE " + table;

      queryString += " SET ";
      queryString += objToSql(objColVals);
      queryString += " WHERE ";
      queryString += condition;

      console.log(queryString);
      connection.query(queryString, function(err, result) {
        if (err) {
         throw err;
        }
        cb(result);
      });
    },
    ~~~~

    * I've also included a **delete**...

    ~~~~ 
    delete: function(table, condition, cb) {
      var queryString = "DELETE FROM " + table;
      queryString += " WHERE ";
      queryString += condition;

      console.log(queryString);
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
        cb(result);
      });
    }
    ~~~~
  
    * The ORM object was then exported for **bucket.js** using `module.exports`.


&#160;


#### Model setup steps

1. Inside the **BucketList** directory, a folder named **models** was created.

2. In **models**, a file called **bucket.js** was created.

    * **orm.js** was imported into the **bucket.js** file.

    * Inside **bucket.js**, code was created that calls the ORM functions using input that's specific to bucket list tasks:

    ~~~~
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
    ~~~~

    * Included the export at the end of the **bucket.js** file.

    ~~~~
    // Export the database functions for the controller. In this case, it's the bucket list controller.
    module.exports = bucket;
    ~~~~

&#160;


#### Controller setup steps

1. Inside the **bucket** directory, a folder named **controllers** was created.

2. In **controllers**, a file called **bucketController.js** was created.

3. Inside the **bucketController.js** file, the following were imported:

   * **Express**
   ~~~~
    var express = require("express");
    var router = express.Router();
   ~~~~
   * **bucket.js**
   ~~~~
    // bucket.js needs to be imported to use DB functionality.
    var bucket = require("../models/bucket.js");
   ~~~~

4. The **router** was then created for the app, and exported at the end of the file.
    ~~~~
    router.get("/", function(req, res) {
      bucket.all(function(data) {
        var hbsObject = {
          bucket: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
      });
    });
    
      ... (router.post, put, update, and delete follow) ...

    // server.js needs this exported.
    module.exports = router;
    ~~~~

&#160;




#### View setup

1. Inside the **bucket** directory, a folder named **views** was created.

2. Inside the **views** directory, the following were created:

    * a file called **index.handlebars**
    * a directory named **layouts**

3. Inside the **layouts** folder, a **main.handlebars** file was initialized.

4. Configuration of the handlebars files:
    
    * **main.handlebars** was set up so it's able to be used by Handlebars:
    
    ~~~~
      ...
        <body>
          {{{ body }}}
        </body>
      ...
    ~~~~

    * **index.handlebars** was set up to contain the template that Handlebars uses, *including* a button that submits the user's input into the database.

- - - 


#### Directory structure

The resulting files and directories make up the following structure:

```
.
├── config
│   ├── connection.js
│   └── orm.js
│ 
├── controllers
│   └── bucketController.js
│
├── db
│   ├── schema.sql
│   └── seeds.sql
│
├── models
│   └── bucket.js
│ 
├── node_modules
│ 
├── package.json
│
├── public
│   │
│   └── assets
│       ├── css
│       │   ├── reset.css
│       │   └── style.css
│       └── images
│           └── (multiple images)
│
├── server.js
│
└── views
    ├── index.handlebars
    │
    ├── layouts
    │   └── main.handlebars
    │
    └── partials
          └── bucket
              └── delete-bucket.handlebars

```

- - -

MVPs I still need to look at:

1. check vulnerable dependencies with Heroku 
2. (maybe look at what files do not need to be commited to GH)
    * screenshot
    * ( db ? ) line 61
    * orm object code? line 191

- - -

### In case you're interested...

Again, you can interact with this application in real-time at the following address:<br />[https://bonnieho-bucketlist.herokuapp.com/](https://bonnieho-bucketlist.herokuapp.com/), however, if you'd prefer to take it out for a spin on your local machine, keep reading.


#### Local Environment Setup

To use this version of "BucketList" from your own local environment, here's what you've got to do:

**Step 1 - Clone this repo in the command line below using the following text:**
```
git clone https://github.com/bonnieho/BucketList.git
```
**Step 2 - In you local directory structure, navigate into the newly cloned repo directory:**
```
cd BucketList
```
**Step 3 - Install the required NPM packages using the following command:**
```
npm install
```
**Step 4 - Start the application server using the following command:**
```
node server.js
```
**Step 5 - Now, open the local application on port 3000 at the URL:**
```
 http://localhost:3000/
```

- - - 


(c)2017 __Bonnie Lynne Hoffman__ 

*toward the completion of The University of Texas at Austin Houston Coding Boot Camp Certificate - (June 2017 cohort)*

