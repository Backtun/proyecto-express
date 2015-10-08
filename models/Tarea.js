var config = require('../config');
var thinky = require('thinky')(config.rethinkdb);
var r = thinky.r;
var type = thinky.type;

// Create the model
var Tarea = thinky.createModel("tarea", {
    id: type.string(),
    titulo: type.string(),
    completado: type.boolean(),
    fecha: type.date().default(r.now())
});

// Ensure that an index createdAt exists
Todo.ensureIndex("fecha");