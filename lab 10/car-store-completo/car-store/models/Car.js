const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  marca: { type: String, required: true },
  modelo: { type: String, required: true },
  ano: { type: Number, required: true },
  qtde_disponivel: { type: Number, required: true, min: 0 }
});

module.exports = mongoose.model('Car', carSchema);