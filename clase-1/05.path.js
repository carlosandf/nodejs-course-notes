const path = require('node:path');

// barra separadora de carpetas según el sistema operativo
console.log({ separator: path.sep }); // -> \ ó /

// unir rutas con path.join()
const filePath = path.join('content', 'subfolder', 'test.txt');
console.log({ filePath }); // -> content\subfolder\test.txt ó content/subfolder/test.txt

// obtener el nombre del archivo
const base = path.basename('/tmp/secret-files/password.txt');
console.log({ base }); // -> password.txt

const fileName = path.basename('/tmp/secret-files/password.txt', '.txt');
console.log({ fileName }); // -> password

const extension = path.extname('image.jpg');
console.log({ extension }); // -> .jpg
