const builder = require('botbuilder');

//const sms = require('../utils/sms.js');

module.exports = [
    session => {
        session.sendTyping();
        builder.Prompts.choice(session, "Would you like to order sigle doughnuts or a mix of different types?", "Single|Mix");
    },
    (session, results) => {
        if (results.response) {
            let answer = results.response.entity;
            if (answer === "Single") {
                session.beginDialog('/doughnutSingle');
            } else {
                session.beginDialog('/doughnutMix');
            }
        }
    },
    //
    (session) => {
        session.sendTyping();
        var msg = "Please confirm your order of " + session.dialogData.qty + " " + session.dialogData.doughnut + " doughnuts for a total of GHc" + session.dialogData.total;
        builder.Prompts.choice(session, msg, "Yes|No");
    },
    (session, results) => {
        let answer = results.response.entity;
        if(answer === "Yes"){
            session.send("Congratulations, your order is being processed and will reach you soon");
        } else{
            session.endDialog("Oh OK. maybe you'd like to order something else");
            session.beginDialog('/');
        }
    }
]