// Esto sólo en los módulos nativos
// que no tienen promesas nativas

// const { promisify } = require('node:util')
// const readFilePromise = promisify(fs.readFile)

import { readFile } from 'node:fs/promises'

console.log('**Leyendo el primer archivo...**')
const text = await readFile('./file.txt', 'utf-8')
console.log('primer texto:', text)

console.log('**--> Hacer cosas mientras lee el archivo...**')

console.log('**Leyendo el segundo archivo...**')
const secondText = await readFile('./file2.txt', 'utf-8')
console.log('Segundo texto:', secondText)

// console.log('**Leyendo el primer archivo...**')
// async function readFirst () {
//   const text = await readFile('./file.txt', 'utf-8')
//   console.log('primer texto:', text)
// }
// readFirst()

// console.log('**--> Hacer cosas mientras lee el archivo...**')

// console.log('**Leyendo el segundo archivo...**')

// async function readSecond () {
//   const secondText = await readFile('./file2.txt', 'utf-8')
//   console.log('Segundo texto:', secondText)
// }
// readSecond()

// console.log('**Terminando de leer')