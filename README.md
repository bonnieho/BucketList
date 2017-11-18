# BucketList - an exercise showcasing Node.js, Express, and Handlebars
Published site: [https://bonnieho-bucketlist.herokuapp.com/](https://bonnieho-bucketlist.herokuapp.com/)

### Overview

This original task assigned was to create a "burger logger" to enter a customized burger into a list and then have whichever burger you specify to "devour" transfer to an "eaten" list through the use of Node and mySQL to route that data and update the underlying database. No html files are to be harmed here as Handlebars is the technology called upon to render the resulting pages based on a series of templates as linked views.

Since the entire cohort was tasked with this same exercise, I wanted to have something more unique to show as exemplary of my ability to implement the same MVC design patten using the homegrown ORM needed for this assignment. So, I improvised and applied the same requirements into a different type of list to categorize - a "bucket" list.


### The Blueprint

* BucketList is a listing app that lets users input items that they'd like to accomplish at some point in their lives.

* When a user submits an item that they'd like to accomplish, it will display those tasks on the left side of the page, waiting to be accomplished.

* Each task in the Bucket List area also has a `Done!` button. When the user clicks it, the item will move to the right side of the page, into a completed list.

* The app stores every task in a database, whether completed or not.

* **(Bonus feature that I've added to my project)** Additionally, I've added a third list where a user can decide that if they enjoyed a specific completed task enough, they can click an accomplanying button associated with that task and choose to move it to a third list for activities that were enjoyable enough to do again.

- - - 

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

   * In the `orm.js` file, methods were created that will execute the necessary MySQL commands in the controllers. These are the methods that are used to retrieve and store data in the database.

     * `selectAll()` 
     * `insertOne()` 
     * `updateOne()` 

   * The ORM object was then exported in `module.exports`.


#### Model setup

* Inside the `BucketList` directory, a folder named `models` was created.

  * In `models`, a file called `bucket.js` was created.

    * `orm.js` was imported into the `bucket.js` file.

    * Inside `bucket.js`, code was created that calls the ORM functions using input that's specific to bucket list tasks.

    * Included the export at the end of the `bucket.js` file.


#### Controller setup

1. Inside the `bucket` directory, a folder named `controllers` was created.

2. In `controllers`, a file called `bucket_controller.js` was created.

3. Inside the `bucket_controller.js` file, the following were imported:

   * Express
   * `bucket.js`

4. The `router` was then created for the app, and exported at the end of the file.



#### View setup

1. Inside the `bucket` directory, folder named `views` was created.




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






- - - 


(c)2017 __Bonnie Lynne Hoffman__ 

*toward the completion of The University of Texas at Austin Houston Coding Boot Camp Certificate - (June 2017 cohort)*

