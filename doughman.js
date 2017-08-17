'use strict';
require('dotenv').config();

const express = require('express');
const builder = require('botbuilder');
const port = process.env.PORT || 3978;

const app = express();

let connector = new builder.ChatConnector({
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD
});

let bot = new builder.UniversalBot(connector);

bot.dialog('/', [
  session => {
    session.send('Welcome');
  }
]);

app.post('/api/messages', connector.listen());

app.get('/', (req, res) => {
  res.send('Doughman standalone');
})

app.listen(port, () => {
  console.log(`DoughmanBot is listening on port ${port}`);
})




