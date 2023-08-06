class Contact {
    constructor() {
        this.contacts = {};
    }

    getContactsByUserName(username) {
        const user = username;
        if (!this.contacts[user]) return [];
        return this.contacts[user]
    }

    setUserContact(username, contact) {
        const user = username;
        const contacts = contact;
        const arr = contacts[user]
        if (arr.length) {
            this.contacts[username].push(contact);
        } else {
            this.contacts[username] = [contact]
        }
    }
}
module.exports = Contact;