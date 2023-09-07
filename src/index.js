const express = require("express");
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });
const app = express();
const UserDB = require("./database/database.js");
const { createToken, validateToken } = require("./jwt.js");
app.use(express.json());

const activeUsers = {};

app.get("/api/v1/whoami", (req, res) => {
  res.json({
    message: "I am talk verse server",
    status: "OK"
  });
});



app.post("/api/v1/signup", (req, res) => {
  const { username, email, password } = req.body;
  const sql = `INSERT INTO user(username, email, password) VALUES(?,?,?)`;
  UserDB.run(sql, [username, email, password], (err) => {
    if (err) return res.json({ status: 300, success: false, error: err });
    return res.json({ status: 200, success: true, id: this.lastID })
  });
});

app.post("/api/v1/users", validateToken, (req, res) => {
  const sql = `SELECT * FROM user`;
  UserDB.all(sql, [], (err, rows) => {
    if (err) return res.json({ status: 300, success: false, err: err });
    if (rows.length < 1) return res.json({ status: 300, sucess: false, err: 'Not Match Found' });
    res.json({ status: 200, data: rows, success: true });
  });
});

app.get("/api/v1/login", (req, res) => {
  const { email, password } = req.body;
  const sql = `SELECT * FROM user WHERE email = ? AND password = ?`;
  UserDB.get(sql, [email, password], (err, row) => {
    if (err) return res.json({
      err: err,
      status: "Bad Request"
    });
    const token = createToken(row);
    return res.json({ status: 200, success: true, user: { email: row.email, username: row.username, acess_token: token } });
  });

});

app.post("/api/v1/addContact", validateToken, (req, res) => {
  const uemail = req.useremail;
  const { username, name, email } = req.body;
  const query = "INSERT INTO Contacts (user, name, email) VALUES(? , ? , ?)";
  UserDB.run(query, [uemail, name, email,], (error) => {
    if (error) return res.json();
    res.json({
      "message": `${name} is added successfully`,
      "status": "OK"
    })
  });
});

app.get("/api/v1/getContacts", validateToken, (req, res) => {
  const { email } = req.useremail;
  console.log("====>", email);
  const query = 'SELECT * FROM Contacts WHERE email = ?';
  UserDB.all(query, [email], (err, contacts) => {
    if (err) return res.json({ err });
    res.json({
      user: email,
      contacts: contacts
    })
  })
});

app.get("/api/v1/connection", validateToken, (req, res) => {

});

wss.on('connection', (ws) => {
  console.log("hii");
  // WebSocket connection established
  ws.on('message', (message) => {
    // Handle incoming messages from the client
    const data = JSON.parse(message);
    if(data.method == "connect"){
      const user = data.user;
      activeUsers[user.email] = ws;
      ws.email = user.email;
    }
    console.log(`Received: ${message}`);
  });
  
  ws.on("close",(e)=>{
    delete activeUsers[ws.email]
  })

  // Send a message to the client
  ws.send('Hello, client!');
});

app.listen(3000, () => {
  console.log("listening at 3000");
});