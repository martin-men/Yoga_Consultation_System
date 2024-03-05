// Importación de librerías necesarias y routers
const express = require("express");
const cors = require("cors");
const router_asanas = require("./asanas/routers.js");
const router_morfemas = require("./morfemas/routers.js");


let corsOptions = {
  origin: 'https://asanas-learn.000webhostapp.com/' // Compliant
};

// Creamos el objeto tipo express
const app = express();
app.use(cors(corsOptions));



// Ocultar la información de la versión de Express
app.disable('x-powered-by');

// Parsear solicitudes con contenido JSON
app.use(express.json());

// Añadir las rutas al servidor
app.use("/", router_asanas);
app.use("/", router_morfemas);

// Activar el servidor
app.listen(3000, () => {
  console.log("Servidor escuchando en http://localhost:3000");
});
