var app = angular.module('toDo',[]);

app.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('[{');
  $interpolateProvider.endSymbol('}]');
});

app.controller('toDoCtrl',['$scope','$http',function($scope,$http)
{
	$scope.tareas = 
	[
		{
			"id":"1",
			"nombre":"Hacer el proyecto de express",
			"completada":"true"
		},
		{
			"id":"2",
			"nombre":"Conquistar el mundo",
			"completada":"false"
		}
	];

	//Cantidad de tareas
	$scope.cantidad=$scope.tareas.length;
}
]);