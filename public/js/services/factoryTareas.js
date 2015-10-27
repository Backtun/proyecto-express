app.factory('factoryTareas',["$http",function($http){
 
        var urlBase='api/tareas/';

        return {
            agregar : function(tarea){
                return $http.post(urlBase,tarea);
            },
            actualizar: function(id){
                return $http.update(urlBase+id);
            },
            borrar: function(id){
                return $http.delete(urlBase+id);
            },
            getAll : function(){
               return $http.get(urlBase);
            }
        }
    }]);