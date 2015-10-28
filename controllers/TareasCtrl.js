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
        console.log('POST api/tareas '+Tarea._id);
    	res.status(200).jsonp(Tarea);
    });
};

exports.borrar = function(req, res) {  
    Tarea.findByIdAndRemove(req.params.id, function(err) {
                if(err) 
                    {
                        return res.send(500, err.message);
                    }else{
                console.log('DELETE api/tareas '+req.params.id);    
                res.status(200).jsonp('Tarea borrada');
            }
        });
};

exports.actualizar = function(req, res) {  
    Tarea.findById(req.params.id, function(err, tarea) {
        tarea.title     = req.body.titulo;
        tarea.completa  = req.body.completa;
        tarea.idUsuario = req.body.idUsuario;

        tarea.save(function(err) {
            if(err) return res.send(500, err.message);
            console.log('UPDATE api/tareas '+req.params.id);  
            res.status(200).jsonp(tarea);
        });
    });
};