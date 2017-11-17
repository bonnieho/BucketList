# BucketList - an excerise showcasing Node.js, Express, and Handlebars

### Overview

This original task assigned was to create a "burger logger" to enter a customized burger into a list and then have whichever burger you specify to "devour" transfer to an "eaten" list through the use of Node and mySQL to route that data and update the underlying database. No html files are to be harmed here as Handlebars is the technology called upon to render the resulting pages based on a series of templates as linked views.

Since the entire cohort was tasked with this same exercise, I wanted to have something more unique to show as exemplary of my ability to implement the same MVC design patten using the homegrown ORM needed for this assignment. So, I improvised and applied the same requirements into a different type of list to categorize - a "bucket" list.


### The Blueprint

* BucketList is a listing app that lets users input items that they'd like to accomplish at some point in their lives.

* When a user submits an item that they'd like to accomplish, it will display those tasks on the left side of the page, waiting to be accomplished.

* Each task in the Bucket List area also has a `Done!` button. When the user clicks it, the item will move to the right side of the page, into a completed list.

* The app stores every task in a database, whether completed or not.

* **(Bonus feature that I've added to my project)** Additionally, I've added a third list where a user can decide that if they enjoyed a specific completed task enough, they can click an accomplanying button associated with that task and choose to move it to a third list for activities that were enjoyable enough to do again.



#### App Setup

1. `BucketList` GitHub repo intialized.

2. A *package.json* file was created by running `npm init`.

3. Installed the *Express npm package* using: `npm install express --save`.

4. Created a *server.js* file (at root).

5. Installed the *Handlebars npm package* using: `npm install express-handlebars --save`.

6. Installed the *method-override npm package* using: `npm install method-override --save`. *(This lets us use the DELETE method in the form tag's action attribute.)*

7. Installed the *body-parser npm package* using: `npm install body-parser --save`.

8. Installed *MySQL npm package* using: `npm install mysql --save`.

9. Required the following npm packages inside of the *server.js* file:
   * *express*
   * *method-override*
   * *body-parser*



#### DB Setup

1. A folder named `db` was created in the `BucketList` directory.

2. In the `db` folder, a `schema.sql` file was created to initialize the one table (`bucket_list`) in this `bucket_db` database. Th following SQL queries are contained in this schema filed:

   * Created the `bucket_db`.
   * Allows for switching to or using the `bucket_db`.
   * Created a `bucket_list` table with these fields:
     * **id**: an auto incrementing int that serves as the primary key.
     * **item**: a string.
     * **done**: a boolean.
     * **again**: a boolean.

3. Also in the `db` folder, a `seeds.sql` file was created. In this file, insert queries are written to populate the `bucket_list` table with several entries including some that have marked as having already been accomplished.

4. Both `schema.sql` and `seeds.sql` files were run from the command line to initialize the database in the mysql server.


#### Config Setup

1. Inside the `BucketList` directory, afolder named `config` was created.

2. A `connection.js` file was created inside the `config` directory.

   * Inside the `connection.js` file, code was set up to connect Node to MySQL.

   * That new connection was then exported.


3. An `orm.js` file was created inside the `config` directory.

   * The `connection.js` was set as a required import into `orm.js` file.

   

   * In the `orm.js` file, create the methods that will execute the necessary MySQL commands in the controllers. These are the methods you will need to use in order to retrieve and store data in your database.

     * `selectAll()` 
     * `insertOne()` 
     * `updateOne()` 

   * Export the ORM object in `module.exports`.

#### Model setup

* Inside your `burger` directory, create a folder named `models`.

  * In `models`, make a `burger.js` file.

    * Inside `burger.js`, import `orm.js` into `burger.js`

    * Also inside `burger.js`, create the code that will call the ORM functions using burger specific input for the ORM.

    * Export at the end of the `burger.js` file.

#### Controller setup

1. Inside your `burger` directory, create a folder named `controllers`.

2. In `controllers`, create the `burgers_controller.js` file.

3. Inside the `burgers_controller.js` file, import the following:

   * Express
   * `burger.js`

4. Create the `router` for the app, and export the `router` at the end of your file.

#### View setup

1. Inside your `burger` directory, create a folder named `views`.

   * Create the `index.handlebars` file inside `views` directory.

   * Create the `layouts` directory inside `views` directory.

     * Create the `main.handlebars` file inside `layouts` directory.

     * Setup the `main.handlebars` file so it's able to be used by Handlebars.

     * Setup the `index.handlebars` to have the template that Handlebars can render onto.

     * Create a button in `index.handlebars` that will submit the user input into the database.

#### Directory structure

All the recommended files and directories from the steps above should look like the following structure:

```
.
├── config
│   ├── connection.js
│   └── orm.js
│ 
├── controllers
│   └── burgers_controller.js
│
├── db
│   ├── schema.sql
│   └── seeds.sql
│
├── models
│   └── burger.js
│ 
├── node_modules
│ 
├── package.json
│
├── public
│   ├── assets
│   │   ├── css
│   │   │   └── burger_style.css
│   │   └── img
│   │       └── burger.png
│   └── test.html
│
├── server.js
│
└── views
    ├── index.handlebars
    └── layouts
        └── main.handlebars
```



- - -

### Hosting on Heroku

Now that we have a backend to our applications, we use Heroku for hosting. Please note that while **Heroku is free**, it will request credit card information if you have more than 5 applications at a time or are adding a database. 

Please see [Heroku’s Account Verification Information](https://devcenter.heroku.com/articles/account-verification) for more details. 







- - - 


(c)2017 __Bonnie Lynne Hoffman__ 

*toward the completion of The University of Texas at Austin Houston Coding Boot Camp Certificate - (June 2017 cohort)*

