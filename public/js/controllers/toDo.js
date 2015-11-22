app.controller('toDoCtrl',['$scope','factoryTareas','$location',function($scope,rest,$location)
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
	$scope.ajaxEliminar= function(tarea)
	{
		rest.borrar(tarea._id)
            .success(function(res) {
            	$scope.eliminar(tarea);
            })
            .error(function (error) {
                console.log('No se puedo borrar la tarea: ' + error.message);
            });
	};
	
	$scope.eliminar= function(tarea)
	{
		var indice=$scope.todasTareas.indexOf(tarea);
		console.log('ELIMINO: Se elimino la tarea ´'+tarea.titulo+'´');
		$scope.todasTareas.splice(indice,1);
		$scope.filtrarTareas();
	};
/**************************     
	Funcion pedir tareas               

***************************/
	function getTareas() {
        rest.getAll()
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

	$scope.ajaxAgregar = function(titulo) 
	{
		rest.agregar({'titulo':titulo})
            .success(function (data) 
            {
            	 $scope.agregar(data);
            })
            .error(function (error) {
                alert('No se puedo cargar los datos: ' + error.message);
            });
	};

	$scope.agregar = function(tarea)
	{
		$scope.todasTareas.push(tarea);
		$scope.tarea='';
		$scope.filtrarTareas();
		console.log('NUEVO: se agrego la tarea ´'+tarea.titulo+'´');        
	};

/**************************************************************     
	Funcion cambiar estado de tarea (completa o incompleta)               
	
***************************************************************/
	$scope.ajaxActualizar= function(tarea)
	{
		//Guardo tarea en variable auxiliar
		var paramTarea=tarea;
		//Cambio estado de la tarea
		tarea.completada=!tarea.completada;

		rest.actualizar(tarea)
			.success(function (res) 
			{
				$scope.actualizar(paramTarea);
			})
			.error(function (error) {
                alert('No se actualizar la tarea: ' + error.message);
            });
	};

	$scope.actualizar= function(tarea)
	{
		//Busco la tarea pasada por parametro en el array de tareas
		var indice=$scope.todasTareas.indexOf(tarea);
		//Cambio el estado de la tarea
		//$scope.todasTareas[indice].completada= !$scope.todasTareas.completada;

		$scope.filtrarTareas();

		console.log(
				'CAMBIO: La tarea ´'+$scope.todasTareas[indice].titulo+
				'´ ahora esta '+$scope.todasTareas[indice].completada);
	};
}]);