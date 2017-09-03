const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

const apiFactory = require('./dg-api/ApiFactory');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/ivent');

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.listen(PORT);

console.log('server is up on port: ' + PORT);

apiFactory.build(app);