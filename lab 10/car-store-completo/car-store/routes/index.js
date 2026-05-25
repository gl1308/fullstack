const router = require('express').Router();

router.get('/', (req, res) => {
  res.redirect('/projects');
});

router.get('/projects', (req, res) => {
  const projects = [
    { name: 'Carros', link: '/cars/admin/cars' }
  ];

  res.render('projects', { projects });
});

module.exports = router;