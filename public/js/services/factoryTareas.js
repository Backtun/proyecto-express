app.factory('factoryTareas',["$http",function($http){
 
        var urlBase='api/tareas/';

        return {
            add : function(tarea){
                return $http.post(urlBase,tarea);
            },
            borrar: function(id){
                return $http.delete(urlBase+id);
            },
            getAll : function(){
               return $http.get(urlBase);
            }
        }
    }]);