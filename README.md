# 📡 Registro de Estado del Servidor – Node.js + Express

Este proyecto es una aplicación backend que permite generar reportes del estado del servidor mediante un endpoint HTTP. Los reportes se almacenan en archivos JSON organizados por fecha y guardados en una carpeta específica.

---

## 🚀 Funcionalidades

- 📅 Fecha y hora del reporte
- 🟢 Tiempo de actividad del servidor (desde el inicio de ejecución)
- 💻 Tiempo de encendido del sistema operativo
- 📈 Memoria RAM total y utilizada
- 🗂️ Almacenamiento automático en archivos por día (`log-YYYYMMDD.json`) dentro de la carpeta `reportes/`

---

## 🛠️ Tecnologías utilizadas

- Node.js
- Express.js
- Módulos nativos de Node (`os`, `fs/promises`, `path`)

---

## 📂 Estructura del proyecto

/Log-test
├── index.mjs // Script principal
├── reportes/ // Carpeta donde se almacenan los logs
│ └── log-YYYYMMDD.json // Archivos diarios de reporte
├── package.json
└── README.md


---

## 📦 Instalación

```bash
git clone https://github.com/JulM10/Log-test.git
cd estado-servidor
npm install
