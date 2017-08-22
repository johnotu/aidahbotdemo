'use strict';
require('dotenv').config();

const express = require('express');
const builder = require('botbuilder');
const mongoose = require('mongoose');
const config = require('./config/database');
const dashboard = require('./routes/dashboard');

const port = process.env.PORT || 3978;

mongoose.Promise = global.Promise;
mongoose.connect(config.database);
mongoose.set('debug', true);

mongoose.connection.on('connected', () => {
	console.log('Connected to Doughman DB')
});
mongoose.connection.on('error', err => {
	console.error('Doughman DB error: ', err);
	throw err;
})

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

app.use(express.static('public'));
app.use('/dashboard', dashboard);

app.post('/api/messages', connector.listen());

// app.get('/', (req, res) => {
//   res.send('Doughman standalone');
// })

app.listen(port, () => {
  console.log(`DoughmanBot is listening on port ${port}`);
})




