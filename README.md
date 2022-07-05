
 # ---------------------------Desafio Personal Challenge-----------------------
   

## Tabla de Contenidos
1. [Información General](#informaci%C3%B3n-general)  
2. [Interpretacion del Escenario](#interpretación-del-escenario)
3. [Tecnologias](#tecnologias)
4. [APIs Utilizadas](#apis-utilizadas)
5. [Motivo Utilizacion Base de Datos](#motivo-utilizacion-base-de-datos)
6. [Prueba Local](#prueba-local)
7. [Prueba Remota](#prueba-remota)
  
***
## Información General

Estes Repositorio es el entregable al desfio Tecnico para el rol de Backend Developer de Node.  
En las siguientes secciones de este documento se detallan las tecnologias utilizadas, las librerias empleadas, así como el enfoque utilizado a la hora del desarrollo.
***
## Interpretación del Escenario

En el enunciado se plantean 4 endpoints a implementar, y en base a lo descripto en el enunciado, se desarrollo de la siguinte manera:  
### /v1
Un endpoint basico, el cual no recibe ningun argumento, y que devuelve un mensaje por defecto. No hacepta otro metodo que no sea GET   
### /v1/location
 Se interpretó que es otro enpoint basico, el cual extrae de la peticion la IP, y en base a eso, devuelve en la respuesta los datos de la ubicacion. No hacepta otro metodo que no sea GET  
### /v1/current city
 Se interpretó que es un endpoint el cual genera ua respuesta en base a si el parametro **city** se encuentra presente o no.  
1. Si el parametro **city** está ausente, va a mostrar la informacion del clima y de la ciudad desde donde se realiza la solicitud
2. Si el parametro **city** está presente, va a mostrar la informacion de la ciudad que se va a mostrar  
### /v1/forecast/city:
 Se interpretó que es un endpoint el cual genera ua respuesta en base a si el parametro **city** se encuentra presente o no.  
1. Si el parametro **city** está ausente, va a mostrar la informacion del clima a 5 dias y de la ciudad desde donde se realiza la solicitud
2. Si el parametro **city** está presente, va a mostrar la informacion de la ciudad que se va a mostrar
***
## Tecnologias
Las tecnologias a utilizaren este proyecto son:
* ![Javascript](/img/javascript.png)Javascript  
* ![NodeJS](/img/node.png) NodeJS  y Framework Express
* ![MongoDB](/img/mongo.png) MongoDB  
* ![Heroku](/img/heroku.png) Heroku  

***
## APIs Utilizadas
Las APIs utilizadas fueron las siguientes:  
[IPAPI](https://ipapi.co/): Para obtener información de la ciudad desde una IP publica.  
[MAPBOX](https://www.mapbox.com/): Para obtener información de la ciudad.  
[OPENWEATHER](https://openweathermap.org/): Para obtener información del clima.  
***
## Motivo Utilizacion Base de Datos
Si bien en el escenario, no se menciona la necesidad de persistir los datos. Consideré que era el mejor enfoque a aplicar. Ya que de esta manera, se puede realizar por ejemplo 1 consulta a las APIs de Terceros como **MAPBOX** y al no cambiar esa informacion, se puede consultar todas las demas veces a la BD sin necesitar de tener que volver a consultar a la API.  
Lo mismo ocurre con **OPENWEATHER**. Si bien, el tiempo va cambiando a lo largo del tiempo, si se definen intervalos de tiempo que sirvan como indicadores al servidor para que vuelva a generar una solicitud a la API, se pueden evitar muchos llamados.  
Por ejemplo, si hay 100 llamados desde la misma ciudad por hora, si nosotros definimos que el tiempo de vida del clima sea de 15 minutos, solo acceder a **OPENWEATHER** 4 veces, en vez de 100. Este mismo concepto se puede aplicar a las llamadas a Forecast
***
## Prueba Local 
Para probar localmente el entregable, es necesario, abrir una consola de comando en la misma carpta en la que se descargó este proyecto y ejecutar:  
```
git init  
git pull https://github.com/JaimeMatias/Pchallenge.git  
npm install package.json 
```
Tambien va a ser necesario que se renombre el documento **test.env** --> **.env** y que se coloquen en el mismo las claves solicitadas.
```
npm start
```
***
## Prueba Remota
Si se desea unicamente probar los EndPoints, se puede consultar a la siguiente ruta:  
[PersonalChallenge](https://personalchallenge.herokuapp.com/v1)
