import { Router } from "express";
import ManejadorDatos from "./manejadorDatos.js";

const manejador = new ManejadorDatos();

const router = Router();

// Definir rutas
router.get("/Posturas", async(req, res) => {
    const datos = await manejador.mostrarDatosGenerales();
    return res.json(datos);
});

router.get("/Posturas/:sanscrito", async(req, res) => {
    const registrosSimilares = await manejador.buscarPorSanscrito(req.params.sanscrito);
    if (!registrosSimilares || registrosSimilares.length === 0) {
        return res.status(404).json({ error: "Elemento no encontrado" });
    }
    return res.json(registrosSimilares);
});
router.get("/Posturas/Info/:sanscrito", async(req, res) => {
    const datos = await manejador.extraerInfo(req.params.sanscrito);
    return res.json(datos);
});
// Exportar el enrutador
export default router;