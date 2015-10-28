var express = require('express');
var router  = express.Router();
var tareas = require('../controllers/TareasCtrl');

router.route('/api/tareas')  
  .get(tareas.getAll)
  .post(tareas.agregar);

router.route('/api/tareas/:id')  
  .delete(tareas.borrar)
  .put(tareas.actualizar);

module.exports= router;