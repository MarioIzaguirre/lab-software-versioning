// ============================================
// APLICACIÓN DE SALUDO - v1.0.1 (HOTFIX)
// Funcionalidad básica: Saludo simple
// HOTFIX: Validar que el nombre no esté vacío
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

// Función principal para v1.0.1
async function iniciarAplicacion() {
  console.log('═══════════════════════════════════════');
  console.log('   APLICACIÓN DE SALUDO - v1.0.1');
  console.log('═══════════════════════════════════════');
  console.log('');
  console.log('¡Bienvenido a la aplicación de saludo!');
  console.log('');

  registrarLog('Aplicación iniciada - v1.0.1 (hotfix)');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('¿Cuál es tu nombre? ', (nombre) => {
    // HOTFIX: Validar que el nombre no esté vacío
    const nombreLimpio = (nombre || '').trim();

    if (!nombreLimpio) {
      console.log('');
      console.log('⚠️  Error: Debes ingresar un nombre válido.');
      console.log('');
      registrarLog('ERROR: Usuario no ingresó un nombre válido');
      rl.close();
      process.exit(1);
    }

    const saludo = `¡Hola, ${nombreLimpio}!`;
    console.log('');
    console.log(saludo);
    console.log('');

    registrarLog(`Usuario saludado: ${nombreLimpio}`);
    registrarLog('Aplicación finalizada - v1.0.1');

    console.log('Gracias por usar la aplicación.');
    rl.close();
    process.exit(0);
  });
}

iniciarAplicacion();
