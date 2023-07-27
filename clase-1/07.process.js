// Argumentos de entrada
console.log({ args: process.argv })

// Controlar eventos del proceso
process.on('exit', () => {
  // limpiar los recursos
  console.log('Limpiar recursos')
})

// Currente working directory
console.log({ currentDirectory: process.cwd() })

// Acceder a variables de entorno
console.log({ ENV: process.env.PEPITO })

// Controlar el proceso y su salida
process.exit(0)// Toda ha ido bien

// process.exit(1) // ha ocurrido un error
