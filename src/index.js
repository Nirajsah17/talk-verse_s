const express = require("express");
const app = express();
const UserDB = require("./database/table.js");
const cookieParser = require("cookie-parser");
const { createToken } = require("./jwt.js");
app.use(cookieParser);
app.use(express.json());


app.listen(3000, () => {
    console.log("listening at 3000");
});

app.post("/api/v1/signup", (req, res) => {
    const { username, email, password } = req.body;
    const sql = `INSERT INTO user(username, email, password) VALUES(?,?,?)`;
    UserDB.run(sql, ['niraj', 'niraj@mail.com', 'password@123'], (err) => {
        if (err) return res.json({ status: 300, success: false, error: err });
        console.log(username, email, password);
    });
    return res.json({ status: 200, success: true })
});

app.get("/api/v1/user", (req, res) => {
    const sql = `SELECT username FROM user`;
    UserDB.all(sql, [], (err, rows) => {
        if (err) return res.json({ status: 300, success: false, err: err });
        if (rows.length < 1) return res.json({ status: 300, sucess: false, err: 'Not Match Found' });
        res.json({ status: 200, data: rows, success: true });
    });
});

app.get("/api/v1/login", (req, res) => {
    const { email, password } = req.body;
    const sql = `SELECT username FROM user WHERE email == ${email} AND password == ${password}`;
    UserDB.all(sql, [], (err, rows) => {
        if (err) return res.json({ status: 404, success: false, err: err });
        if (rows.length < 1) return res.json({ status: 404, success: false, err: 'Not Found' });;
        const token = createToken(user);
        res.cookie("access-token", token,{
            maxAge: 60 * 60 *24 *30 *1000
        });
        res.json("logged in")
        return res.json({ status: 200, success: true, data: email });
    });

});