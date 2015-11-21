Proyecto Express Acamica
========================

Bienvenido a este proyecto de Acamica! Si quieres ver las instrucciones completas las puedes encontrar [aquí](https://www.acamica.com/clases/1886/express/proyecto-final).


Cómo correr el ejemplo
-----------------

Crea un fork del proyecto desde github y luego clona el repositorio en un directorio local

```
git clone <url-del-clone>
```

Instala las dependencias

```
npm install
```

Ejecuta el servidor
```
node app.js
```

O si estas desarrollando y quieres que se actualice en forma continua, instala `nodemon` y corre

```
npm run dev
```

Caracteristicas
========================

Librerías utilizadas en el cliente
--------------------

### Material Design Lite
Porque la estética importa, decidimos hacer el proyecto usando Material Design. Google provee una librería que
incluye CSS y un poco de JS llamada [Material Design Lite](http://www.getmdl.io/). El *lite* es porque no requiere
de otros frameworks y es bastante minimalista. 

### Angular.js
Esta página es un SPA (single-page application) o aplicación de página única es una aplicación web, para dar una mejor experiencia al usuario en la velociadad de interacción. 
[Angular](http://www.angular.com/).

Librerías utilizadas en el servidor
--------------------

### Express
Es un micro Framework, carga solo lo necesario para funcionar, nos permite realizar aplicaciones en node.js rapidamente.[Express.js](http://expressjs.com/es/).

### MongoDB
Una base de datos orientada a documentos (NoSQL) en la cual persistimos los datos de nuestra aplicación.
[Driver Mongodb para node.js](http://mongodb.github.io/node-mongodb-native/2.0/).