var Tarea = require('../models/TareaModel');

exports.getAll= function(req,res) {
	
	Tarea.find(function(err, tareas) {
	    if(err) 
            {
                res.send(500, err.message);
            }

	    console.log('GET api/tareas');
	    res.status(200).jsonp(tareas);
    });

};

exports.agregar = function(req, res) 
{  
    var NuevaTarea = new Tarea({
        titulo:req.body.titulo,
        idUsuario:req.session.id
    });

    NuevaTarea.save(function(err, Tarea) {
        if(err) 
        {
            return res.send(500, err.message);
        }
        console.log('POST api/tareas');
    	res.status(200).jsonp(Tarea);
    });
};

exports.borrar = function(req, res) {  
    Tarea.findById(req.params.id, function(err, tarea) {
        if(err)
            if(err) 
                {
                    return res.send(500, err.message);
                }
        tarea.remove(function(err) {
            if(err) 
                {
                    return res.send(500, err.message);
                }
            console.log('DELETE api/tareas');    
            res.status(200).jsonp('Tarea borrada');
        })
    });
};