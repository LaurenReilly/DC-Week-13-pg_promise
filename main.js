const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const promise = require('bluebird');

// pg-promise initialization options:
const initOptions = {
    // Use a custom promise library, instead of the default ES6 Promise:
    promiseLib: promise 
};

//has to be here since we created initOptions above. JS reads top to bottom!
const pgp = require('pg-promise')(initOptions);

// Database connection parameters(configs will always be different)
const config = {
    host: 'localhost',
    port: 5432,
    database: 'restaurant',
    user: 'postgres'
};

// Create the database instance:
const db = pgp(config);

//query followed by a promise
db.query('SELECT * FROM restaurants')
  .then(function (results){
    results.forEach(function (r) {
        console.log(r.id, r.name, r.distance, r.stars, r.cuisine, r.favorite, r.takeout);
      });
  });

  //insert into db

  //we use variables to input data because we need to have quotes around our data for postico
  // the \ is a line ending
  const name = "waffle house"
  const query = `INSERT INTO restaurants ("name") \
  VALUES('${name}')`;

  db.result(query).then(function(result){
      console.log(result);
  });

  