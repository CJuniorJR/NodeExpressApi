const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/config');

const url = config.bd_string;
const options = { reconnectTries: Number.MAX_VALUE, reconnectInterval: 1000, poolSize: 5, useNewUrlParser: true };

mongoose.connect(url, options);
mongoose.set('useCreateIndex', true);

mongoose.connection.once('open', () => {
    console.log('Aplicação conectada ao banco de dados');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes
const userRoutes = require('./Routes/user');
const indexRoutes = require('./Routes/index');

app.use('/user', userRoutes);
app.use('/', indexRoutes);

app.listen(3000);

module.exports = app;