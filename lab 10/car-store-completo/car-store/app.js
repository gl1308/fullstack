const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true
}));

mongoose.connect('mongodb://localhost:27017/carshop')
.then(() => console.log('MongoDB conectado'))
.catch(err => console.log(err));

app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/cars', require('./routes/car'));

app.listen(80, () => {
  console.log('Servidor rodando na porta 80');
});