# Curso de Node.js


### globalThis

En JavaScript existe un objeto global, en el navegador se conoce como ***window*,** y en node se conoce como ***global***, pero se utiliza el termino ***globalThis***, para referirno al mismo objeto. Hoy en día se recomiendo referirnos al objeto global como globalThis, tanto en node como en el navegador.


### Modulos

En JavaScript existen dos formas de utilizar modulos, la forma clasica (que es la que mas te encontrarás en documentaciones o ejemplos), es **CommonJS**, y la forma mas actual y la recomendada para proyectos nuevos, **ESModules** (EcmaScript Modules).

- **CommonJS:**

*sum.js*

```javascript
function sum (a, b) {
    return a + b
}

module.exports = { sum }
```

Creamos la funcion `sum()` y la exportamos utilizando `module.export` indicando que es igual a un objeto que con la propiedad `sum`

*index.js*

```javascript
function sum (a, b) {
    return a + b
}

module.exports = { sum }
```

- **ESModules:**

*sum.mjs*

```javascript
export function sum (a, b) {
  return a + b
}
```

Con esta sintaxis, utilizamos la palabra `export` para exportar la función `sum`.

*index.mjs*

```javascript
import { sum } from './sum.mjs'

console.log(sum(1, 5))
```

Aqui utilizamos la palabra reservada `import` para importar el modulo.

Como te pudiste dar cuenta, cambiamos la extensión del archivo de `.js` a `.mjs`, y es que por defecto JavaScript los archivos `.js` solo soportan CommonJS, mas adelante verémos la forma de cambiar esto.

### Modulos nativos de node

En Node.js, los módulos nativos son una parte esencial de su sistema de módulos que permite a los desarrolladores acceder a funcionalidades específicas del sistema operativo y del entorno del servidor directamente desde el código JavaScript. Estos módulos están incluidos en la instalación predeterminada de Node.js y no requieren una instalación adicional.

Los módulos nativos son también conocidos como "módulos principales" o "módulos integrados" y proporcionan una variedad de funcionalidades para tareas comunes, como manipulación de archivos, manejo de rutas, creación de servidores web, y más. Algunos ejemplos de módulos nativos en Node.js son:

1. **fs** : Este módulo permite trabajar con el sistema de archivos del sistema operativo, permitiendo la lectura y escritura de archivos, creación de directorios, entre otras operaciones.
2. **http** : Proporciona las herramientas necesarias para crear un servidor web y realizar solicitudes HTTP.
3. **path** : Facilita la manipulación de rutas de archivos y directorios, haciendo que sea más fácil trabajar con ubicaciones de archivos independientemente del sistema operativo.
4. **os** : Permite acceder a información del sistema operativo, como la arquitectura del procesador, memoria disponible y mucho más.
5. **util** : Ofrece diversas utilidades para facilitar la escritura de código, como funciones de depuración, promisificación y herencia de objetos.
6. **events** : Implementa el patrón de diseño EventEmitter para facilitar la comunicación entre diferentes partes de una aplicación a través de eventos.

Para utilizar un módulo nativo en tu aplicación Node.js, solo necesitas requerirlo utilizando la función `require` seguida del nombre del módulo (esto si usas CommonJS). Por ejemplo:

```javascript
const fs = require('fs');
const http = require('http');
```

***NOTA:** A partir de la versión 16 de Node, debes usas el prefijo `node:` seguido del nombre del modulo. Ejemplo:*

```javascript
const fs = require('node:fs');
const http = require('node:http');
```

Si usas ESModules, sería asi:

```javascript
import fs from 'node:fs';
import http from 'node:http';
```

De esta manera, podrás acceder a las funcionalidades proporcionadas por el módulo y utilizarlas en tu aplicación.

Es importante mencionar que además de los módulos nativos, Node.js también cuenta con un amplio ecosistema de módulos de terceros disponibles a través del sistema de gestión de paquetes npm, que extienden aún más la funcionalidad y permiten a los desarrolladores reutilizar código en sus proyectos.
