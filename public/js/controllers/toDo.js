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
	};

	$scope.$watch('filtro', function() {
       $scope.cantidad=0;
       actualizarContador();
   	});

   	function actualizarContador()
   	{
   		$scope.cantidad=0;
   		if($scope.filtro === undefined)
       {
       		$scope.cantidad=$scope.tareas.length;
       }else{
	       $scope.tareas.map(function(ele)
		       	{
		       		if(ele.completa === $scope.filtro)
		       		{
		       			 $scope.cantidad=$scope.cantidad+1;
		       		}
		       	}
	       	);
   		}
   	}
	
	$scope.eliminar= function(tarea)
	{
		console.log(tarea);
		tareas.borrar(tarea)
            .success(function(tarea) {
            	var indice=$scope.tareas.indexOf(tarea);
				$scope.tareas.splice(indice,1);
				console.log("ELIMINO: Se elimino la tarea ´"+tarea.nombre+"´");
				actualizarContador();
            })
            .error(function (error) {
                console.log('No se puedo cargar los datos: ' + error.message);
            });
	}


	$scope.agregar = function(titulo) 
	{
		tareas.add({'titulo':titulo})
            .success(function (data) {
            	$scope.tareas.push(data);
            })
            .error(function (error) {
                console.log('No se puedo cargar los datos: ' + error.message);
            });
		$scope.tarea='';
		console.log("NUEVO: se agrego la tarea ´"+titulo+"´");
		actualizarContador();
	}

	$scope.cambiarEstado= function(tarea)
	{
		var indice=$scope.tareas.indexOf(tarea);
		$scope.tareas[indice].completa=!tarea.completa;
		console.log("CAMBIO: La tarea ´"+tarea.nombre+"´ ahora esta "+$scope.tareas[indice].completa);
		actualizarContador();
	}
}
]);