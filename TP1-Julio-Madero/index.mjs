
import os from "os";
import express from "express";
import { readFile, writeFile, mkdir } from "fs/promises";
import path, { dirname, join } from "path";
import { fileURLToPath } from "url";


const __dirname = dirname(fileURLToPath(import.meta.url));

const PUERTO = 3300
const app = express()
app.listen(PUERTO)

const carpeta = dirname(fileURLToPath(import.meta.url))
const tiempoInicioServidor = Date.now()

app.post('/estado-servidor',async (req,res) =>{
  try {
    const reporte = {
      fechaHora: obtenerFechaHoraActual(),
      tiempoServidorActivo: obtenerTiempoServidorActivo(tiempoInicioServidor),
      tiempoSistemaOperativoActivo: obtenerTiempoSistemaOperativoActivo(),
      memoria: obtenerMemoria()
    };

    const fechaActual = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const nombreArchivo = `log-${fechaActual}.json`;

    const carpetaReportes = join(__dirname, 'reportes');
    await mkdir(carpetaReportes, { recursive: true }); // ✅ crea carpeta si no existe

    const rutaArchivo = join(carpetaReportes, nombreArchivo);

    let contenido = { reportes: [] };
    try {
      const texto = await readFile(rutaArchivo, 'utf-8');
      contenido = JSON.parse(texto);
    } catch {
      // si el archivo no existe, se usa el contenido por defecto
    }

    contenido.reportes.push(reporte);
    await writeFile(rutaArchivo, JSON.stringify(contenido, null, 2));

    res.status(201).json({ mensaje: 'Reporte guardado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al generar el reporte' });
  }
})

function obtenerFechaHoraActual() {
  return new Date().toISOString();
}

function obtenerTiempoServidorActivo(startTime) {
  const ahora = Date.now();
  const segundos = Math.floor((ahora - startTime) / 1000);
  return `${segundos} segundos`;
}

function obtenerTiempoSistemaOperativoActivo() {
  const segundos = Math.floor(os.uptime());
  return `${segundos} segundos`;
}

function obtenerMemoria() {
  const total = Math.floor(os.totalmem() / 1024 / 1024);
  const libre = Math.floor(os.freemem() / 1024 / 1024);
  const usada = total - libre;

  return {
    memoriaTotal: `${total} MB`,
    memoriaUsada: `${usada} MB`
  };
}
