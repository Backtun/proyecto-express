app.controller('toDoCtrl',['$scope','factoryTareas',function($scope,tareas)
{
	//Inicio cantidad de tareas
	$scope.cantidad=0;
	$scope.tareas=[];
	$scope.status ='';
	$scope.filtro=undefined;
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

	$scope.setFiltro = function(estado)
	{
		$scope.filtro=estado;
	}

	$scope.estaActivo = function(estado)
	{
		if(estado==='pendientes' && $scope.filtro === false)
			{return true}
		else if(estado==='todas' && $scope.filtro === undefined)
			{return true}
		else if(estado==='completas' && $scope.filtro === true)
			{return true}
		else
			{return false}
	}
	
	$scope.eliminar= function(tarea)
	{
		var indice = buscar(tarea.id);
		$scope.tareas.splice(indice,1);
		console.log("ELIMINO: Se elimino la tarea ´"+tarea.nombre+"´");
	}

	buscar= function(id)
	{
		for(f=0;f<$scope.tareas.length;f++)
		  {
		    if($scope.tareas[f].id == id)
		    {
		    	return f;
		    	break;
		    }
		  }
	}

	$scope.agregar = function(titilo) 
	{
		$scope.tareas.push(
		{
            "id":Date.now(),
            "nombre":titilo,
            "completada":false
		});
		console.log("NUEVO: se agrego la tarea ´"+titilo+"´");
	}

	$scope.cambiarEstado= function(tarea)
	{
		var indice=buscar(tarea.id);
		$scope.tareas[indice].completada=!tarea.completada;
		console.log("CAMBIO: La tarea ´"+tarea.nombre+"´ ahora esta "+$scope.tareas[indice].completada);
	}
}
]);