const fs = require('node:fs');
const pc = require('picocolors');

console.log('**Leyendo el primer archivo...**');
fs.readFile('./file.txt', 'utf-8', (err, text) => { // <---- ejecutas este callback
  if (err) return console.error(pc.red('Error'), err);
  console.log('primer texto:', text);
});

console.log('**--> Hacer cosas mientras lee el archivo...**');

console.log('**Leyendo el segundo archivo...**');
fs.readFile('./file2.txt', 'utf-8', (err, text) => {
  if (err) return console.error(pc.red('Error'), err);
  console.log('segundo texto:', text);
});

console.log('**Terminando de leer');
