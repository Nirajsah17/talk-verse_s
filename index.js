const express = require("express");
const app = express();
const cors = require('cors');
const UserModel = require("./database/userModel");
const UserContact = require("./database/userContactModel");

const PORT = 3000;
const UserDb = new UserModel();
const ContactDb = new UserContact()
app.listen(PORT, () => {
    console.log(`Server is running at http:localhost:${PORT}`)
});
app.use(cors());
app.use(express.json());

app.get("/whoami", (req, res) => {
    res.send({ message: 'I am host for user' });
});

app.post("/user", (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const object = {
        username,
        email,
        password
    };
    UserDb.insertOne(object);
    res.send({
        message: "user created successfully",
        user: object.username
    });
});

app.get('/user/',(req,res)=>{
    const username = req.query.username;
    const userObj = UserDb.getUserByUserName(username);
    res.send({
        user: userObj
    });
});

app.get('/userAll',(req,res)=>{
    const users = UserDb.getAllUser();
    res.send({
        status: 200,
        users: users
    });
});

app.post("/userContact",(req,res)=>{
    const user = req.body.username;
    if(!UserDb.getUserByUserName(user)) return;
    const contact = req.body.contact;
    if(user && contact){
        ContactDb.setUserContact(user,contact);
        console.log(ContactDb.contacts)
        res.send({
            status: 200,
            contact: contact,
            user: user
        });
    }
});

app.get("userContact/",(req,res)=>{
    const username = req.body.username;
    if(!UserDb.getUserByUserName(username)) return;
    const result = ContactDb.getContactsByUserName(username);
    res.send(result);
});

