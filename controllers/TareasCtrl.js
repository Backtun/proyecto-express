var mongodb = require('mongodb'); 
var config   = require('../config').db;

//Promesa de conexion al server de mongo
var base = mongodb.MongoClient.connect(config.url)

exports.getAll= function(req, res) {
    
    base.then(function (base) {

    //Selecciona la coleccion Tareas
    var tareas = base.collection('Tareas');

    //Una promesa de busqueda de tarea usando un puntero de array
    var promesa = tareas.find({}).toArray()
        
        .then(function(resultado)
        { 
            res.status(200).send(resultado);
        })
        .catch(function (err) {
            console.error('Error en get ', err.message);
            res.status(500).send(err);
        });
    })
    .catch(function (err) {
            console.error('Error al conectar ', err.message);
            res.status(500).send(err);
    });
};

exports.agregar = function(req, res) 
{  
    var NuevaTarea = {
        titulo:req.body.titulo,
        completada:false,
        
        idUsuario:req.session.id
    };

    base.then(function (base) {

        var tareas = base.collection('Tareas');
        
        tareas.insertOne(NuevaTarea,fecha: new Date())

            .then(function(resultado) {
                console.log('POST api/tareas '+resultado.insertedId);
                res.status(200).jsonp(NuevaTarea);      
            })
        
            .catch(function (err) {
                console.error('Error al agregar: ', err.message);
                res.status(500).send(err);
            });
        })
        
        .catch(function (err) {
            console.error('Error al conectar: ', err.message);
            res.status(500).send(err);
        });
};

exports.borrar = function(req, res) {  

    base.then(function (base) {

    var tareas = base.collection('Tareas');
        
        tareas.remove({_id : new mongodb.ObjectID(req.params.id)})

            .then(function(resultado)
            {
                console.log('DELETE api/tareas '+req.params.id);    
                res.status(200).jsonp('Tarea borrada');
            })
            .catch(function (err) {
                console.error('Error al borrar ', err.message);
                res.status(500).send(err);
            });
    })
    .catch(function (err) {
            console.error('Error al conectar ', err.message);
            res.status(500).send(err);
    });
};

exports.actualizar = function(req, res) {  
 
    base.then(function (base) {

    var tareas = base.collection('Tareas');
        
        tareas.update({_id : new mongodb.ObjectID(req.params.id)},{ $set: {completada:req.body.completada}})

            .then(function(resultado)
            {
                console.log('update api/tareas '+req.params.id);    
                res.status(200).jsonp(resultado);
            })
            .catch(function (err) {
                console.error('Error al actualizar ', err.message);
                res.status(500).send(err);
            });
    })
    .catch(function (err) {
            console.error('Error al conectar ', err.message);
            res.status(500).send(err);
    });
};