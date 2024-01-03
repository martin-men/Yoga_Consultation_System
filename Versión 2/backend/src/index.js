//importación de librerías necesarias y routers
import express from "express";
import cors from "cors";
import router_asanas from "./asanas/routers.js";
import router_morfemas from "./morfemas/routers.js";

//creamos el objeto tipo express
const app = express();

//realizamos su configuración
app.use(cors());
app.use(express.json());

//añadimos las rutas al servidor
app.use("/", router_asanas);
app.use("/", router_morfemas);

//activamos el servidor
app.listen(3000, () => {
    console.log("Servidor escuchando en http://localhost:3000");
});