const sqlite = require("sqlite3").verbose();
const path = require("path");
const userDb = path.resolve(__dirname + "/user.db")
const db = new sqlite.Database(userDb, sqlite.OPEN_READWRITE, (err) => {
    if (err) return console.log(err);
});

const sql = `CREATE TABLE user(ID INETEGER PRIMARY KEY, username, email, password)`;

db.run(sql);

module.exports = db;