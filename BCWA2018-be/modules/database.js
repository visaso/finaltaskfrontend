'use strict';
const mysql = require('mysql2');

const connect = () => {
  // create the connection to database
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
  });
  return connection;
};

const select = (connection, callback, res) => {
  // simple query
  connection.query(
      'SELECT * FROM task5',
      (err, results, fields) => {
        // console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        console.log(err);
        callback(results, res);
      },
  );
};

const insert = (data, connection, callback) => {
  // simple query
  connection.execute(
      'INSERT INTO task5 (category, title, details, coordinates, thumbnail, image, original) VALUES (?, ?, ?, ?, ?, ?, ?);',
      data,
      (err, results, fields) => {
        // console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        console.log(err);
        callback();
      },
  );
};

const update = (data, connection) => {
  return new Promise((resolve, reject) => {
    connection.execute(
        'UPDATE task5 SET category = ?, title = ?, details = ? WHERE mID = ?;', data, (err, results, fields) => {
          if (err) reject(err);
          if (results) resolve(results);
        }
    )
  });
};

const deleteImage = (item, connection) => {
  return new Promise((resolve, reject) => {
    connection.execute(
        'DELETE FROM task5 WHERE mID = ?;' , item, (err, results, fields) => {
          resolve(results);
        }
    )
  })
};

const searchTitle = (title, connection) => {
  return new Promise((resolve, reject) => {
    connection.execute(
        'SELECT * FROM task5 WHERE title = ?;', title, (err, results, fields) => {
          resolve(results);
        },
    )
  })
};

module.exports = {
  connect: connect,
  select: select,
  insert: insert,
  update: update,
  deleteImage: deleteImage,
  searchTitle: searchTitle,
};