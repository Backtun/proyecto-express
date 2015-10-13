var Tarea = require('../models/TareaModel');

exports.getAll= function(req,res) {
	
	Tarea.find(function(err, tareas) {
	    if(err) res.send(500, err.message);

	    console.log('GET /tareas')
	    res.status(200).jsonp(tareas);
    });

};

exports.agregar = function(req, res) {  
    console.log('POST '+req.body.titulo);
    var NuevaTarea = new Tarea({
        titulo:req.body.titulo,
        idUsuario:req.session.id
    });

    NuevaTarea.save(function(err, Tarea) {
        if(err) return res.send(500, err.message);
    	res.status(200).jsonp(Tarea);
    });
};