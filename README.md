# Examen frontend

Este proyecto fue construido con la herramienta [Create React App](https://create-react-app.dev/), para crear single-page applications con React. Constituye una aplicación frontend con información sobre las comunas de Chile que se encuentran en la zona de totalidad del eclipse solar del 2020.

## Pre-requisitos para correr proyecto:
* Node.js LTS (ojalá 12.x, pero también puede ser 10.x)
* [Yarn](https://yarnpkg.com)

## Setup proyecto

* Clonar repositorio
* `cd examen-frontend-rehearsal`
* (Opcional) Si usan `nvm`, cambiar a versión válida para el proyecto
  * `nvm use`
* Instalar dependencias:
  * `yarn install`

## Ejecutar aplicación

```sh
PORT=3001 yarn start
```
Este comando corre la aplicación en modo development (suficiente para el examen). La gracia de este modo es que al hacer cambios en el código (por ejemplo, dentro de `src/App.js`), la página abierta en el browser debiese refrescarse automáticamente. Siéntete libre de probar haciendo algún cambio para ver este comportamiento.

## Probar aplicación

Para verificar que todo está bien deben abrir [http://localhost:3001](http://localhost:3001) para ver el resultado en el browser. Debiesen ver un layout con sólo un header que incluye:
- Un pequeño logo del eclipse
- Título "Examen IIC2513 2020-2" a la izquierda
- Texto "Username" a la derecha
- Botón con texto "Salir" a la derecha

¡Listo! Ya estás de condiciones de correr una single-page application en el browser para desarrollar el examen.

¡Éxito!
