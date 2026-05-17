// ============================================
// APLICACIÓN DE SALUDO - v2.0
// Funcionalidades:
//   - Saludo personalizado con nombre
//   - Soporte multi-idioma (español/inglés)
//   - Sistema de logs con niveles
// ============================================

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// ----- CONFIGURACIÓN -----
const VERSION = '2.0.0';
const logsDir = path.join(__dirname, '../logs');

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// ----- DICCIONARIO DE IDIOMAS -----
const idiomas = {
  es: {
    bienvenida: '¡Bienvenido a la aplicación de saludo!',
    seleccionIdioma: 'Selecciona tu idioma / Select your language:',
    opcionesIdioma: '  1) Español\n  2) English',
    pedirIdioma: 'Opción / Option: ',
    pedirNombre: '¿Cuál es tu nombre? ',
    saludo: (nombre) => `¡Hola, ${nombre}! Es un gusto saludarte.`,
    despedida: 'Gracias por usar la aplicación. ¡Hasta pronto!',
    idiomaInvalido: 'Opción inválida. Se usará español por defecto.'
  },
  en: {
    bienvenida: 'Welcome to the greeting application!',
    seleccionIdioma: 'Select your language / Selecciona tu idioma:',
    opcionesIdioma: '  1) Español\n  2) English',
    pedirIdioma: 'Option / Opción: ',
    pedirNombre: 'What is your name? ',
    saludo: (nombre) => `Hello, ${nombre}! Nice to greet you.`,
    despedida: 'Thank you for using the application. See you soon!',
    idiomaInvalido: 'Invalid option. English will be used by default.'
  }
};

// ----- SISTEMA DE LOGS CON NIVELES -----
function log(nivel, mensaje) {
  const timestamp = new Date().toISOString();
  const linea = `[${timestamp}] [${nivel}] ${mensaje}\n`;
  const archivoLog = path.join(logsDir, 'app.log');
  fs.appendFileSync(archivoLog, linea);
}

const logger = {
  info:  (msg) => log('INFO',  msg),
  warn:  (msg) => log('WARN',  msg),
  error: (msg) => log('ERROR', msg)
};

// ----- FUNCIÓN AUXILIAR PARA PREGUNTAR -----
function preguntar(rl, pregunta) {
  return new Promise((resolve) => {
    rl.question(pregunta, (respuesta) => resolve(respuesta.trim()));
  });
}

// ----- FUNCIÓN PRINCIPAL -----
async function iniciarAplicacion() {
  console.log('═══════════════════════════════════════');
  console.log(`   APLICACIÓN DE SALUDO - v${VERSION}`);
  console.log('═══════════════════════════════════════');
  console.log('');

  logger.info(`Aplicación iniciada - v${VERSION}`);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // 1. Seleccionar idioma
  console.log('Selecciona tu idioma / Select your language:');
  console.log('  1) Español');
  console.log('  2) English');
  const opcionIdioma = await preguntar(rl, 'Opción / Option: ');

  let idioma;
  if (opcionIdioma === '1') {
    idioma = 'es';
    logger.info('Idioma seleccionado: Español');
  } else if (opcionIdioma === '2') {
    idioma = 'en';
    logger.info('Idioma seleccionado: English');
  } else {
    idioma = 'es';
    logger.warn(`Opción de idioma inválida: "${opcionIdioma}". Se usa español por defecto.`);
    console.log(idiomas.es.idiomaInvalido);
  }

  const txt = idiomas[idioma];

  // 2. Mostrar bienvenida
  console.log('');
  console.log(txt.bienvenida);
  console.log('');

  // 3. Pedir nombre
  const nombre = await preguntar(rl, txt.pedirNombre);

  if (!nombre) {
    logger.error('El usuario no ingresó un nombre');
    console.log(' No se ingresó un nombre.');
    rl.close();
    process.exit(1);
  }

  // 4. Mostrar saludo
  console.log('');
  console.log(txt.saludo(nombre));
  console.log('');
  logger.info(`Usuario saludado: ${nombre} (idioma: ${idioma})`);

  // 5. Despedida
  console.log(txt.despedida);
  logger.info(`Aplicación finalizada - v${VERSION}`);

  rl.close();
  process.exit(0);
}

iniciarAplicacion();