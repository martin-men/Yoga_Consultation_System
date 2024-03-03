//importación de router de express y de service
import { Router } from "express";
import { consult_asanas } from "./service.js";

//creación de un objeto tipo router
const router_asanas = Router();

// Definición ruta 
router_asanas.get("/Posturas", async(req, res) => {
    //obtención de la data
    const asanas = await consult_asanas();
    //respuesta json
    return res.json(asanas);
});

//exportación del router
export default router_asanas;