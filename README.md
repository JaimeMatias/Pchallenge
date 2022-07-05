 https://personalchallenge.herokuapp.com/

 # ---------------------------Desafio Personal Challenge-----------------------
  
   

## Tabla de Contenidos
1. [Información General](#informaci%C3%B3n-general)
2. [Tecnologias](#tecnologias)
3. [Paquetes Utilizados](#Paquetes-Utilizados)
  

### Información General
***
Estes Repositorio es el entregable al desfio Tecnico para el rol de Backend Developer de Node.  
En las siguientes secciones de este documento se detallan las tecnologias utilizadas, las librerias empleadas, así como el enfoque utilizado a la hora del desarrollo.

## Interpretación del Escenario
En el enunciado se plantean 4 endpoints a implementar, y en base a lo descripto en el enunciado, se desarrollo de la siguinte manera:  
/v1: Un endpoint basico, el cual no recibe ningun argumento, y que devuelve un mensaje por defecto. No hacepta otro metodo que no sea GET   
/location: Se interpretó que es otro enpoint basico, el cual extrae de la peticion la IP, y en base a eso, devuelve en la respuesta los datos de la ubicacion. No hacepta otro metodo que no sea GET  
/current city: Se interpretó que es un endpoint el cual genera ua respuesta en base a si el parametro city se encuentra presente o no.  
1. Si el parametro city está ausente, va a mostrar la informacion del clima y de la ciudad desde donde se realiza la solicitud
2. Si el parametro city está presente, va a mostrar la informacion de la ciudad que se va a mostrar  
/forecast/city: Se interpretó que es un endpoint el cual genera ua respuesta en base a si el parametro city se encuentra presente o no.  
1. Si el parametro city está ausente, va a mostrar la informacion del clima a 5 dias y de la ciudad desde donde se realiza la solicitud
2. Si el parametro city está presente, va a mostrar la informacion de la ciudad que se va a mostrar
## Tecnologias
***
Las tecnologias a utilizaren este proyecto son:
* ![Javascript](/img/javascript.png)Javascript  
* ![NodeJS](/img/node.png) NodeJS  y Framework Express
* ![MongoDB](/img/mongo.png) MongoDB  
* ![Heroku](/img/heroku.png) Heroku  

  
  
## Paquetes Utilizados
***
### Seccion 01
Introducción del curso  
### Seccion 02 Fundamentos de Node
Revisión basica de algunos Puntos claves de JavaScripts
### Seccion 03 Reforzamiento de los temas necesarios
Aspectos no tan basico de Javascripts necesarios para el curso
### Seccion 04 Bases de Node
Principios de como utilizar Node
### Seccion 05 Aplicacion de Tareas
Aplicación CLI que sirve para la gestión de Tareas, permitiendo un CRUD (Create, Read, Update, Delete),
La aplicación almacena de manera persistentes las Tareas
### Seccion 06 Aplicación de Tareas
Aplicación CLI que obtiene como datos el nombre de una ciudad, despliega distintas alternativas que generan una coincidencia con la busqueda, para luego desplegar la
informacion de dicha ciudad por pantalla.  
La aplicación almacena de manera persistente las ultimas 5 busquedas realizadas.  
Las APIs utilizadas fueron las siguientes:  
[MAPBOX](https://www.mapbox.com/): Para obtener información de la ciudad.  
[OPENWEATHER](https://openweathermap.org/): Para obtener información del clima.  
### Seccion 07 Webserver - HTTP - EXPRESS
Aplicacion desarrollada en un Web Server
La aplicación muchas funcionalidades no tiene, el principal propocitó es el de entender el paradigma de desarrollo de  Modelo-Vista-Controlador.  
Ademas se buscaba aprender a desplegar la aplicaciónes en servidores cloud.
La plataforma que se utilizó para el despliegue fue:  
![HEROKU](/img/heroku.png) Heroku  
El URL de la pagina es el siguiente:  
  https://curso-node-07-mj.herokuapp.com/
### Seccion 08-11 REST Server
Aplicacion desarrollada en un Web Server  
Dicha pagina está pensada para aprender los conceptos basicos de la utilización de APIS, así como la interactuación con bases de Datos.  
La plataforma que se utilizó para el despliegue fue:  
![HEROKU](/img/heroku.png) Heroku  
El URL de la pagina es el siguiente:  
  https://curso-08-node-mj.herokuapp.com/  
La documentación de las APIs es el siguiente:
 https://documenter.getpostman.com/view/19429018/UVksLEDn#21ec7ef3-99ff-46b2-b996-34b936dcd063
## Certificado Finalización Curso
* En progreso
