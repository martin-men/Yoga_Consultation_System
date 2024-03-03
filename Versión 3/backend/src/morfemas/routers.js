//importación de router de express y de service
import { Router } from "express";
import { consult_morfemas, consult_morfemas_asana } from "./service.js";

//creación de un objeto tipo router
const router_morfemas = Router();

//definición de la ruta principal
router_morfemas.get("/Morfemas", async(req, res) => {
    //obtención de los morfemas
    const morfemas = await consult_morfemas();
    return res.json(morfemas);
});

//definición de la ruta de busqueda
router_morfemas.get("/Morfemas/:id", async(req, res) => {
    //obtención de los morfemas a base del id
    const morfemas = await consult_morfemas_asana(req.params.id);
    //control de elemento no encontrado
    if (!morfemas || morfemas.length === 0) {
        return res.status(404).json({ error: "Elemento no encontrado" });
    }
    return res.json(morfemas);
});

//exportación del router
export default router_morfemas;