# Curso de Node.js

### globalThis

En JavaScript existe un objeto global, en el navegador se conoce como ***window*,** y en node se conoce como ***global***, pero se utiliza el termino ***globalThis***, para referirno al mismo objeto. Hoy en día se recomiendo referirnos al objeto global como globalThis, tanto en node como en el navegador.

---



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

---



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

---



### Asincronismo

En JavaScript es importante comprender este tema y como funciona. JavaScript es monohilo pero gracias al asincronismo, da la sensación de que no es asi, pero... ¿Que m#&$@ es  el asincronismo?. El asincronismo en JavaScript es una característica esencial del lenguaje que permite realizar operaciones sin bloquear la ejecución del programa principal.

En un contexto síncrono, las tareas se ejecutan una tras otra en orden secuencial, lo que significa que cada tarea debe completarse antes de que la siguiente pueda comenzar. El asincronismo, en cambio, permite que ciertas tareas se ejecuten en segundo plano mientras el programa principal continúa su ejecución. Esto es especialmente útil para operaciones que podrían llevar tiempo, como solicitudes a servidores, lectura de archivos, animaciones, etc. En lugar de detener todo el flujo de ejecución y esperar a que estas tareas se completen, se pueden manejar de forma asincrónica.

En JavaScript, el asincronismo se logra principalmente a través de callbacks, promesas y, más recientemente, mediante el uso de la sintaxis async/await. Aquí un breve resumen de cada uno:

1. **Callbacks:** Un callback es una función que se pasa como argumento a otra función. Cuando la función principal completa su tarea asincrónica, llama al callback para notificar que ha terminado y proporciona el resultado. Sin embargo, el uso excesivo de callbacks puede conducir a un código complejo y propenso a errores, conocido como "callback hell".

   ```javascript
   const fs = require('node:fs')

   console.log('**Leyendo el primer archivo...**')
   fs.readFile('./file.txt', 'utf-8', (err, text) => { // <---- ejecutas este callback
     console.log('primer texto:', text)
   })

   console.log('**--> Hacer cosas mientras lee el archivo...**')

   console.log('**Leyendo el segundo archivo...**')
   fs.readFile('./file2.txt', 'utf-8', (err, text) => {
     console.log('segundo texto:', text)
   })

   console.log('**Terminando de leer')
   ```

   *En este ejemplo ejecutamos el metodo `readFile` del modulo nativo `fs` (fileSystem), este proceso es asincrono, y en el tercer parametro recibe una función (callback), que se esjecutará cuando el archivo haya sido leido.*


1. **Promesas:** Las promesas son objetos que representan un valor que puede estar disponible ahora, en el futuro o nunca. Permiten encadenar operaciones asincrónicas y manejar el éxito o el error de manera más estructurada. Las promesas tienen métodos como `then()` y `catch()` para manejar los resultados.

   ```javascript
   const fs = require('node:fs/promises')

   console.log('**Leyendo el primer archivo...**')
   fs.readFile('./file.txt', 'utf-8')
     .then((text) => {
       console.log('Primer texto:', text)
     })

   console.log('**--> Hacer cosas mientras lee el archivo...**')

   console.log('**Leyendo el segundo archivo...**')
   fs.readFile('./file2.txt', 'utf-8')
     .then((text) => {
       console.log('Segundo texto:', text)
     })
   console.log('**Terminando de leer')
   ```

   *En este ejemplo estamos realizando la misma acción que en el ejemplo anterior, con la diferencia de que ahora, estamos requiriendo el modulo `node:fs/promises`, esto para poder utilizar la sintaxis de promesas. No hay mucha diferencia a ecepción de que ahora no le estamos pasando una función como parametro, sino que estamos utilizando `.then()`, esto hace parte de la sintaxis de las promesas, y basicamente lo que hace es recibir un callback que se ejecuta cuando se haya resolvido la promesa exitosamente.*


1. **Async/Await:** Esta es una sintaxis más moderna y legible para trabajar con código asíncrono. Las funciones marcadas con la palabra clave `async` devuelven automáticamente una promesa. Dentro de las funciones `async`, puedes usar la palabra clave `await` para pausar la ejecución hasta que una promesa se resuelva.

   ```javascript
   const { readFile } = require('node:fs/promises')

   async function init () {
     console.log('**Leyendo el primer archivo...**')
     const text = await readFile('./file.txt', 'utf-8')
     console.log('primer texto:', text)

     console.log('**--> Hacer cosas mientras lee el archivo...**')

     console.log('**Leyendo el segundo archivo...**')
     const secondText = await readFile('./file2.txt', 'utf-8')
     console.log('Segundo texto:', secondText)
   }
   init()
   ```
   *En este ejemplo creamos una función a la le indicamos que será una función asincrona, utilizando la palabra reservada `asyc`. En la quinta linea estamos utilizando la palabra reservada `await` para indicarle a la función que esperar a que `readFile` se termine de ejecutar para seguir con la siguiente instrucción.*
