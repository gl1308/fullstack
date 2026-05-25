const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  const { nome, login, senha } = req.body;

  const hash = await bcrypt.hash(senha, 10);

  await User.create({
    nome,
    login,
    senha: hash
  });

  res.redirect('/auth/login');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {

  const { login, senha } = req.body;

  const user = await User.findOne({ login });

  if(user && await bcrypt.compare(senha, user.senha)){
    req.session.userId = user._id;
    res.redirect('/cars/admin/cars');
  } else {
    res.send('Login inválido');
  }
});

module.exports = router;