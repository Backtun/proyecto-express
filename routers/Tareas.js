var express = require('express');
var router  = express.Router();
var tareas = require('../controllers/TareasCtrl');

router.route('/tareas')  
  .get(tareas.getAll)
  .post(tareas.agregar);
/*
router.route('/tareas/:id')  
  .get(tareas.findById)
  .put(tareas.updateTVShow)
  .delete(tareas.deleteTVShow);
*/
module.exports= router;