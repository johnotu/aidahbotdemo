//const builder = require('botbuilder');

module.exports = [
    (session) => {
        session.sendTyping();
        session.send("Sorry %s, Doughman Customer Support service is coming soon 😒", session.userData.firstName);
        session.beginDialog('/general');
    }
]