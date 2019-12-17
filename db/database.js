const Database = require("better-sqlite3");
const db = new Database("flightlog.sqlite3", { readonly: true });

module.exports = db;

// db.close(err => {
//   if (err) {
//     console.error(err.message);
//   }
//   console.log("Close the database connection.");
// });
