var mongoose = require('mongoose'); 
var config	 = require('../config').db

mongoose.connect(config.url); 

mongoose.connection.on('connected', function () {  
  console.log('Mongoose se conecto a ' + config.url);
}); 

mongoose.connection.on('error',function (err) {  
  console.log('Mongoose:  error de conexion: ' + err);
}); 

mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose: desconectado'); 
});

process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
	console.log('Mongoose: conexion terminada al finalizar app'); 
	process.exit(0); 
  }); 
}); 

