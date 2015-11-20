app.controller('toDoCtrl',['$scope','factoryTareas','$location',function($scope,tareas,$location)
{
	//Inicio cantidad de tareas
	$scope.cantidad=0;
	$scope.tareas=[];
	$scope.todasTareas=[];
	
	getTareas();

/************************************     
	Funcion comprueba si hay tareas               
	
*************************************/
    $scope.estaVacio = function()
    {
    	if($scope.cantidad===0)
    	{
    		return true;
    	}else{
    		return false;
    	}
    };
/***************************************************************************     
	Funcion activa la clase active si el paramentro es igual a la url               
	
****************************************************************************/

	$scope.estaActivo = function (viewLocation) 
	{
    	if(viewLocation === $location.path())
    	{
    		$scope.filtrarTareas();
    		return true;
    	}else if($location.path()==='' && viewLocation === '/todas'){
    		$scope.filtrarTareas();
    		return true;
    	}else{
    		return false;
    	}
	};
/******************************************************    
	Evento cambio ruta 

*******************************************************/
	$scope.$on('$locationChangeSuccess', function(event, newUrl, oldUrl){
    	$scope.filtrarTareas();
	});
/******************************************************    
	Funcion contar tareas (Todas/Completas/Pendientes)               
	Todas:       null
	Completas:   true
	Pendientes:  false
*******************************************************/
	$scope.filtrarTareas = function()
	{
		if($location.path()==='/completas')
		{
			actualizarTareas(true);
		}else if($location.path()==='/pendientes')
		{
			actualizarTareas(false);
		}
		else{
			actualizarTareas(null);
		}	
	};
   	function actualizarTareas(filtro)
   	{
   		$scope.cantidad=0;
   		$scope.tareas=[];
   		//Si el filtro es null es que estamos en todas las tareas
   	  if(filtro === null)
       {
     		$scope.tareas = $scope.todasTareas;
       		$scope.cantidad = $scope.todasTareas.length;
       //Sino el filtro puede ser Pendientes(false) o Completas(true)
       }else{
       		//Recorre todo el array
	       $scope.todasTareas.map(function(ele)
		       	{
		       		//Si la propiedad completada del elemento
		       		//es igual al filtro (true o false)
		       		//Se agrega a tareas y se incrementa el contador
		       		if(ele.completada === filtro)
		       		{
		       			$scope.tareas.push(ele);
		       			$scope.cantidad=$scope.cantidad+1;
		       		}
		       	});
   		}
   	}

/********************************************     
	Funcion eliminar tarea por id               
	
*********************************************/	
	$scope.eliminar= function(tarea)
	{
		tareas.borrar(tarea._id)
            .success(function(res) {
            	var indice=$scope.tareas.indexOf(tarea);
				console.log('ELIMINO: Se elimino la tarea ´'+tarea.titulo+'´');
				$scope.tareas.splice(indice,1);
				$scope.filtrarTareas();
            })
            .error(function (error) {
                console.log('No se puedo borrar la tarea: ' + error.message);
            });
	};

/**************************     
	Funcion pedir tareas               

***************************/
	function getTareas() {
        tareas.getAll()
            .success(function (data) {
                $scope.todasTareas = data;
				$scope.filtrarTareas();
            })
            .error(function (error) {
                console.log('No se puedo cargar los datos: ' + error.message);
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
				$scope.filtrarTareas();
				console.log('NUEVO: se agrego la tarea ´'+titulo+'´');
            })
            .error(function (error) {
                alert('No se puedo cargar los datos: ' + error.message);
            });
	};
/**************************************************************     
	Funcion cambiar estado de tarea (completa o incompleta)               
	
***************************************************************/
	$scope.cambiarEstado= function(tarea)
	{
		var indice=$scope.tareas.indexOf(tarea);
		$scope.tareas[indice].completada=!tarea.completada;
		tareas.actualizar(tarea)
		.success(function (tarea) {	
			console.log(
				'CAMBIO: La tarea ´'+$scope.tareas[indice].titulo+
				'´ ahora esta '+$scope.tareas[indice].completada);
			});
	};
}]);