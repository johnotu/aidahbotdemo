const builder = require('botbuilder');
const doughnuts = require("../../model/doughnuts.json");

module.exports = [
    session => {
        
        session.sendTyping();
        session.send("Mixed doughnuts");
        builder.Prompts.choice(session, "Please pick a mix category", "Pack of 5|Pack of 10");
    },
    (session, results) => {
        if (results.response) {
            let answer = results.response.entity;
            if (answer === "Pack of 5") {
                session.userData.mixQty = '5';
            } else if ( answer === "Pack of 10" ) {
                session.userData.mixQty = '10';
            }
            session.send(session.userData.mixQty);
            session.endDialog();
        } 
    }
]