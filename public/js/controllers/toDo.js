app.controller('toDoCtrl',['$scope','factoryTareas',function($scope,tareas)
{
	//Inicio cantidad de tareas
	$scope.cantidad=0;
	$scope.tareas=[];
	$scope.status ='';
	$scope.filtro=undefined;
	getTareas();

/**************************     
	Funcion pedir tareas               

***************************/
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
/**************************     
	Funcion pedir tareas               
	
***************************/
    $scope.estaVacio= function()
    {
    	if($scope.cantidad===0)
    	{
    		return true;
    	}else{
    		return false;
    	}
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
/******************************************************    
	Funcion contar tareas (Todas/Completas/Pendientes)               
	
*******************************************************/
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
/********************************************************************     
	Evento que escucha el cambio de filtro y actualizar el contador              
	
*********************************************************************/
	$scope.$watch('filtro', function() {
       $scope.cantidad=0;
       actualizarContador();
   	});
/********************************************     
	Funcion eliminar tarea por id               
	
*********************************************/	
	$scope.eliminar= function(tarea)
	{
		tareas.borrar(tarea._id)
            .success(function(res) {
            	var indice=$scope.tareas.indexOf(tarea);
				console.log("ELIMINO: Se elimino la tarea ´"+tarea.titulo+"´");
				$scope.tareas.splice(indice,1);
				actualizarContador();
            })
            .error(function (error) {
                console.log('No se puedo borrar la tarea: ' + error.message);
            });
	}
/********************************************     
	Funcion agregar nueva tareas               
	
*********************************************/

	$scope.agregar = function(titulo) 
	{
		tareas.agregar({'titulo':titulo})
            .success(function (data) {
            	$scope.tareas.push(data);
				$scope.tarea='';
				console.log("NUEVO: se agrego la tarea ´"+titulo+"´");
				actualizarContador();
            })
            .error(function (error) {
                alert('No se puedo cargar los datos: ' + error.message);
            });
	}
/**************************************************************     
	Funcion cambiar estado de tarea (completa o incompleta)               
	
***************************************************************/
	$scope.cambiarEstado= function(tarea)
	{
		var indice=$scope.tareas.indexOf(tarea);
		$scope.tareas[indice].completa=!tarea.completa;
		tareas.actualizar(tarea)
		.success(function (data) {	
			console.log("CAMBIO: La tarea ´"+tarea.nombre+"´ ahora esta "+$scope.tareas[indice].completa);
			actualizarContador();
		});
	}
}
]);