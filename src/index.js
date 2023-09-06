const express = require("express");
const app = express();
const UserDB = require("./database/database.js");
const cookieParser = require("cookie-parser");
const { createToken } = require("./jwt.js");
// app.use(cookieParser);
app.use(express.json());


app.get("/api/v1/whoami", (req, res) => {
    res.json({
        message: "I am talk verse server",
        status: "OK"
    })
});

app.post("/api/v1/signup", (req, res) => {
    const { username, email, password } = req.body;
    const sql = `INSERT INTO user(username, email, password) VALUES(?,?,?)`;
    UserDB.run(sql, [username, email, password], (err) => {
        if (err) return res.json({ status: 300, success: false, error: err});
        console.log(username, email, password);
        return res.json({ status: 200, success: true ,id: this.lastID })
    });
});

app.post("/api/v1/users", (req, res) => {
    const sql = `SELECT * FROM user`;
    UserDB.all(sql, [], (err, rows) => {
        if (err) return res.json({ status: 300, success: false, err: err });
        if (rows.length < 1) return res.json({ status: 300, sucess: false, err: 'Not Match Found' });
        res.json({ status: 200, data: rows, success: true });
    });
});

app.get("/api/v1/login", (req, res) => {
    const { email, password } = req.body;
    const sql = `SELECT username FROM user WHERE email = ? AND password = ?`;
    UserDB.get(sql, [email, password], (err, row) => {
        if (err) return res.json({
            err: err,
            status: "bad request"
        });
        const token = createToken(row);
        res.cookie("access-token", token, {
            maxAge: 60 * 60 * 24 * 30 * 1000
        });
        // res.json("logged in")
        return res.json({ status: 200, success: true, user: row.email });
    });

});

app.post("/api/v1/addContact", (req, res) => {
    const { username, name, email } = req.body;
    const query = "INSERT INTO Contacts (username, name, email) VALUES(? , ? , ?)";
    UserDB.run(query, [username, name, email], (error) => {
        if (error) return res.json();
        res.json({
            "message": `${name} is added successfully`,
            "status": "OK"
        })
    });
});

app.get("/api/v1/getContacts", (req, res) => {
    const { username } = req.body;
    const query = 'SELECT * FROM Contacts WHERE username = ?';
    UserDB.all(query, [username], (err, contacts)=>{
        if(err) return res.json({err});
        res.json({
            user: username,
            contacts: contacts
        })
    })
})

app
app.listen(3000, () => {
    console.log("listening at 3000");
});