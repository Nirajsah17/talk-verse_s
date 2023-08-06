class UserModel {
    constructor() {
        this.document = [];
        this._name = "user";
        this.schema = {
            username: "text",
            email: "email",
            password: "password",
            confirmPassword: "password"
        };
    }

    getUserByUserName(username) {
        if (!username) return;
        const userObj = this.document.find(user => {
            return user.username == username
        });
        if (!userObj) return;
        return userObj;
    }
    getAllUser(){
        return this.document
    }

    insertOne(userObj) {
        if (!userObj) return
        this.document.push(userObj);
    }

    insertMany(usersArray) {
        if (!Array.isArray(usersArray)) return;
        usersArray.forEach(user => {
            this.document.push(user);
        });
    }

    updateOne(updatedUser) {
        if (!updatedUser) return;
        for (let index = 0; index < this.document.length; index++) {
            if (this.document[index].username == updatedUser.username) {
                const keys = Object.keys(updatedUser);
                keys.forEach(key => {
                    this.document[index][key] = updatedUser[key];
                })
            }
        }
        if (!userObj) return;
    }
}
module.exports = UserModel;