app.factory('factoryTareas',["$http",function($http){
 
        var urlBase='api/tareas/';

        return {
            agregar : function(tarea){
                return $http.post(urlBase,tarea);
            },
            actualizar: function(tarea){
                return $http.put(urlBase+tarea._id,tarea);
            },
            borrar: function(id){
                return $http.delete(urlBase+id);
            },
            getAll : function(){
               return $http.get(urlBase);
            }
        }
    }]);