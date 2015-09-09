app.controller('toDoCtrl',['$scope','factoryTareas',function($scope,tareas)
{
	//Inicio cantidad de tareas
	$scope.cantidad=0;
	$scope.tareas=[];
	$scope.status ='';
	getTareas();
	function getTareas() {
        tareas.getAll()
            .success(function (data) {
                $scope.tareas = data;
                $scope.cantidad= $scope.tareas.length;
            })
            .error(function (error) {
                console.log('No se puedo cargar los datos: ' + error.message);
            });
    }

	$scope.eliminar= function(id)
	{
		for(f=0;f<$scope.tareas.length;f++)
		  {
		    if($scope.tareas[f].id == id)
		    {
		    	//console.log($scope.tareas[f].id+" == "+id);
		    	$scope.tareas.splice(f,1);
		    	break;
		    }
		  }
	}

	$scope.agregar = function() {
		
	}
}
]);