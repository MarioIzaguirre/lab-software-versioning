// ============================================
// APLICACIÓN DE SALUDO - v1.0
// Funcionalidad básica: Saludo simple
// ============================================

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Crear directorio de logs si no existe
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Función para registrar logs
function registrarLog(mensaje) {
  const timestamp = new Date().toISOString();
  const linea = `[${timestamp}] ${mensaje}\n`;
  const archivoLog = path.join(logsDir, 'app.log');
  fs.appendFileSync(archivoLog, linea);
}

// Función principal para v1.0
async function iniciarAplicacion() {
  console.log('═══════════════════════════════════════');
  console.log('   APLICACIÓN DE SALUDO - v1.0');
  console.log('═══════════════════════════════════════');
  console.log('');
  console.log('¡Bienvenido a la aplicación de saludo!');
  console.log('');

  registrarLog('Aplicación iniciada - v1.0');

  // Crear interfaz de entrada
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // Solicitar nombre
  rl.question('¿Cuál es tu nombre? ', (nombre) => {
    const saludo = `¡Hola, ${nombre}!`;
    console.log('');
    console.log(saludo);
    console.log('');

    registrarLog(`Usuario saludado: ${nombre}`);
    registrarLog('Aplicación finalizada - v1.0');

    console.log('Gracias por usar la aplicación.');
    rl.close();
    process.exit(0);
  });
}

// Ejecutar aplicación
iniciarAplicacion();