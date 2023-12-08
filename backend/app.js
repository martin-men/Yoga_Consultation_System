import express from "express";
import cors from "cors";
import posturasRutas from "./posturas_rutas.js";
import info_ruta from "./info_ruta.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/", posturasRutas);
app.use("/",info_ruta)

app.listen(3000, () => {
  console.log("Servidor escuchando en http://localhost:3000");
});

