const builder = require('botbuilder');

module.exports = [
    (session) => {
        session.send("Sorry %s, Doughman Bulk Orders is coming soon;)", session.userData.firstName);
        session.beginDialog('/');
    }
]