const connection = require("../config/connection.js");

function objToSql(object) {
  const keyArray = [];

  for (let key in object) {
    const value = object[key];
    if (Object.hasOwnProperty.call(object, key)) {
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      keyArray.push(key + "=" + value);
    }
  }

  return keyArray.toString();
}

const orm = {
  selectAll: function(table, cb) {
    const query = "SELECT * FROM " + table + ";";
    connection.query(query, function(err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  insertOne: function(table, columns, values, cb) {
    let query = "INSERT INTO " + table;

    query += " (";
    query += columns.toString();
    query += ") ";
    query += "VALUES (?";
    for (let i = 1; i < values.length; i++) {
      query += ",?"
    }
    query += ") ";

    console.log(query);

    connection.query(query, values, function(err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  // updates should be an object of all the things to be updated:
  // i.e. {name: "Krabby Patty", devoured: true}
  updateOne: function(table, updates, condition, cb) {
    let query = "UPDATE " + table;

    query += " SET ";
    query += objToSql(updates);
    query += " WHERE ";
    query += condition;

    console.log(query);
    connection.query(query, function(err, result) {
      if (err) throw err;
      cb(result);
    });
  }
};

// Export the orm for the burger.js model
module.exports = orm;
