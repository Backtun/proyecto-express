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
		       		if(ele.completada === $scope.filtro)
		       		{
		       			 $scope.cantidad=$scope.cantidad+1;
		       		}
		       	}
	       	);
   		}
   	}
	
	$scope.eliminar= function(tarea)
	{
		var indice=$scope.tareas.indexOf(tarea);
		$scope.tareas.splice(indice,1);
		console.log("ELIMINO: Se elimino la tarea ´"+tarea.nombre+"´");
		actualizarContador();
	}


	$scope.agregar = function(titilo) 
	{
		$scope.tarea='';
		$scope.tareas.push(
		{
            "id":Date.now(),
            "nombre":titilo,
            "completada":false
		});
		console.log("NUEVO: se agrego la tarea ´"+titilo+"´");
		actualizarContador();
	}

	$scope.cambiarEstado= function(tarea)
	{
		var indice=$scope.tareas.indexOf(tarea);
		$scope.tareas[indice].completada=!tarea.completada;
		console.log("CAMBIO: La tarea ´"+tarea.nombre+"´ ahora esta "+$scope.tareas[indice].completada);
		actualizarContador();
	}
}
]);