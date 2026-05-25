const router = require('express').Router();
const Car = require('../models/Car');

router.get('/', async (req, res) => {
  const cars = await Car.find({});
  res.render('cars', { cars });
});

router.get('/admin/cars', async (req, res) => {

  if(!req.session.userId){
    return res.send('Acesso negado');
  }

  const cars = await Car.find({});

  res.render('admin/cars', { cars });
});

router.get('/admin/cars/new', (req, res) => {

  if(!req.session.userId){
    return res.send('Acesso negado');
  }

  res.render('admin/car_form', { car: null });
});

router.post('/admin/cars', async (req, res) => {

  const { marca, modelo, ano, qtde_disponivel } = req.body;

  await Car.create({
    marca,
    modelo,
    ano,
    qtde_disponivel
  });

  res.redirect('/cars/admin/cars');
});

router.get('/admin/cars/:id/edit', async (req, res) => {

  const car = await Car.findById(req.params.id);

  res.render('admin/car_form', { car });
});

router.post('/admin/cars/:id', async (req, res) => {

  const { marca, modelo, ano, qtde_disponivel } = req.body;

  await Car.findByIdAndUpdate(req.params.id, {
    marca,
    modelo,
    ano,
    qtde_disponivel
  });

  res.redirect('/cars/admin/cars');
});

router.post('/admin/cars/:id/delete', async (req, res) => {

  await Car.findByIdAndDelete(req.params.id);

  res.redirect('/cars/admin/cars');
});

router.post('/admin/cars/:id/sell', async (req, res) => {

  const car = await Car.findById(req.params.id);

  if(car.qtde_disponivel > 0){
    car.qtde_disponivel -= 1;
    await car.save();
  }

  res.redirect('/cars/admin/cars');
});

module.exports = router;