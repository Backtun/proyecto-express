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

	$scope.agregar = function(titilo) {
		$scope.tareas.push(
		{
            "id":"7ae6c6c1-78f1-486a-b7e4-159be010b73f",
            "nombre":titilo,
            "completada":true
		});
		}
}
]);