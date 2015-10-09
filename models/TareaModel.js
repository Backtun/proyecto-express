var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var tareaSchema = new Schema({  
  id:           { type: String },
  titulo:       { type: String },
  completa:     { type: Boolean, default: false },
  fecha:        { type: Date, default: Date.now },
  idUsuario:    { type: String }
});

module.exports = mongoose.model('Tarea', tareaSchema); 