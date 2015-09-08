app.factory('factoryTareas',["$http",function($http){
 
        var urlBase='api/tareas';

        return {
            add : function(tarea){
                return $http.post(urlBase,{tarea:tarea});
            },
            update: function(tarea)
            {
            	return $http.put(urlBase,{tarea:tarea});
            },
            remove: function(){
                return $http.remove(urlBase+tarea.id);
            },
            getAll : function(){
               return $http.get(urlBase);
            }
        }
    }]);