var mongo = require('mongodb').MongoClient; 
var config   = require('../config').db;

exports.getAll= function(req,res) {

    mongo.connect(config.url,function (err,base) {

    var tareas = base.collection('Tareas');

    tareas.find({}).toArray(function(err, resultado) {
        base.close();
	    console.log('GET api/tareas');
	    res.status(200).jsonp(resultado);
        });
    });

};

exports.agregar = function(req, res) 
{  
    var NuevaTarea = {
        titulo:req.body.titulo,
        completada:false,
        idUsuario:req.session.id
    };

    mongo.connect(config.url,function (err,base) {

        var tareas = base.collection('Tareas');
        tareas.insertOne(NuevaTarea,
            function(err,resultado) {
            base.close();        
            console.log('POST api/tareas '+resultado.insertedId);
        	res.status(200).jsonp(resultado);
            });
        });
};

exports.borrar = function(req, res) {  

mongo.connect(config.url,function (err,base)
{
        var tareas = base.collection('Tareas');
        tareas.deleteOne({ _id : req.params.id },
            function(err,resultado)
            {
                console.log('DELETE api/tareas '+resultado.insertedId);    
                res.status(200).jsonp('Tarea borrada');
                base.close();
            });
})
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