"use strict";
var builder = require("botbuilder");
var botbuilder_azure = require("botbuilder-azure");
var path = require('path');

var useEmulator = (process.env.NODE_ENV == 'development');

const dialogList = ["Order Doughnuts", "Make Bulk Orders", "Contact Doughman Support"];

var connector = useEmulator ? new builder.ChatConnector() : new botbuilder_azure.BotServiceConnector({
    appId: process.env['MicrosoftAppId'],
    appPassword: process.env['MicrosoftAppPassword'],
    stateEndpoint: process.env['BotStateEndpoint'],
    openIdMetadata: process.env['BotOpenIdMetadata']
});

var bot = new builder.UniversalBot(connector);
bot.localePath(path.join(__dirname, './locale'));

// bot.dialog('/', function (session) {
//     session.send('You said ' + session.message.text);
// });

bot.dialog('/', [
    (session, args, next) => {
        if(!session.userData.name){
            session.userData.name = session.message.user.name;
            session.userData.firstName = session.message.user.name.split(' ')[0];
        }
        session.sendTyping();
        session.send("Hello %s! Welcome to Doughman. Here you'll find a flavour for every occassion.", session.userData.firstName);
        next();
    },
    (session) => {
        session.sendTyping();
        builder.Prompts.choice(session, 'What would you like to do?', dialogList);
    },
    (session, results) => {
        var answer = results.response.entity;
        switch(answer){
            case "Order Doughnuts":
                session.beginDialog('/orderDoughnuts');
                break;
            case  "Make Bulk Orders":
                session.beginDialog('/bulkOrder');
                break;
            case "Contact Doughman Support":
                session.beginDialog('/doughmanSupport');
                break;
            // default:
            //     session.beginDialog('/intents');
        }
    }
]);

bot.dialog('/orderDoughnuts', require('./dialogs/orderDoughnuts'));
bot.dialog('/bulkOrder', require('./dialogs/bulkOrder'));
bot.dialog('/doughmanSupport', require('./dialogs/doughmanSupport'));

if (useEmulator) {
    var restify = require('restify');
    var server = restify.createServer();
    server.listen(3978, function() {
        console.log('test bot endpont at http://localhost:3978/api/messages');
    });
    server.post('/api/messages', connector.listen());    
} else {
    module.exports = { default: connector.listen() }
}
