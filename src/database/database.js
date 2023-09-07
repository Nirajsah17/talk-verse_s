const sqlite = require("sqlite3").verbose();
const path = require("path");
const database = path.resolve(__dirname + "/database.db");
const db = new sqlite.Database(database, sqlite.OPEN_READWRITE, (err) => {
    if (err) return console.log(err);
});

const userSql = `CREATE TABLE IF NOT EXISTS User(user_id INETEGER PRIMARY KEY, username TEXT, email TEXT, password TEXT)`;
const contactSql = `CREATE TABLE IF NOT EXISTS Contacts (contact_id INETEGER PRIMARY KEY, user TEXT, name TEXT, email TEXT)`;

db.run(userSql);
db.run(contactSql);

module.exports = db;