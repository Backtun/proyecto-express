var app = angular.module('toDo',[]);

app.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('[{');
  $interpolateProvider.endSymbol('}]');
});

app.controller('toDoCtrl',['$scope','$http',function($scope,$http)
{
	//Inicio cantidad de tareas
	$scope.cantidad=0;
	function getTareas()
	{  
		$http.get("/api/tareas")
			.success(function(data){
				$scope.tareas = data;
				$scope.cantidad=$scope.tareas.length;
			});
	}

	getTareas();

	$scope.eliminar= function(id)
	{
		for(f=0;f<$scope.tareas.length;f++)
		  {
		    if($scope.tareas[f].id == id)
		    {
		    	$scope.tareas.splice(f,(f+1));
		    	break;
		    }
		  }
	}

	$scope.cambiarEstado = function(tarea)
	{
		$http.post('/' + tarea.id + '/completado',{completado:tarea.completado})
		.then(function(response) {
	    	console.log("La tarea "+tarea.nombre+" se encuentra "+tarea.completada);
  		});
	}
}
]);