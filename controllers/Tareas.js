var express = require('express');
var uuid = require('uuid');
var router  = express.Router();

router.get('/api/tareas',
	function(req,res) 
	{
    var datos=
    [
        {
            "id":uuid.v4(),
            "nombre":"Hacer el proyecto de express",
            "completada":true
        },
        {
            "id":uuid.v4(),
            "nombre":"Conquistar el mundo",
            "completada":false
        },
        {
            "id":uuid.v4(),
            "nombre":"Aprender angular",
            "completada":false
        },
        {
            "id":uuid.v4(),
            "nombre":"Aprender js",
            "completada":false
        }
	];
    res.json(datos);
});

module.exports=router;