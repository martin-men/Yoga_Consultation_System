//importación de router de express y de service
const { Router } = require("express");
const { crearMorfema, consult_morfemas, consult_morfemas_asana } = require("./service.js");

//creación de un objeto tipo router
const router_morfemas = Router();

//definición de la ruta principal
router_morfemas.get("/Morfemas", async(req, res) => {
    try {
        //obtención de los morfemas
        const morfemas = await consult_morfemas();
        return res.json(morfemas);
    } catch (error) {
        return res.status(500).json({ error: 'Error al obtener los morfemas.' });
    }
});

//definición de la ruta de busqueda
router_morfemas.get("/Morfemas/:id", async(req, res) => {
    try {
        //obtención de los morfemas a base del id
        const morfemas = await consult_morfemas_asana(req.params.id);
        //control de elemento no encontrado
        if (!morfemas || morfemas.length === 0) {
            return res.status(404).json({ error: "Elemento no encontrado" });
        }
        return res.json(morfemas);
    } catch (error) {
        return res.status(500).json({ error: 'Error al obtener los morfemas.' });
    }
});

// Ruta para crear un nuevo morfema
router_morfemas.post('/morfemas', async (req, res) => {
    try {
        const { morfema, significado_es, significado_in } = req.body;

        // Verificar que se proporcionen los datos necesarios
        if ( !morfema || !significado_es || !significado_in) {
            return res.status(400).json({ message: 'Faltan datos para crear el morfema.' });
        }

        // Llamar a la función para crear el morfema
        const nuevoMorfema = await crearMorfema({ morfema, significado_es, significado_in });

        return res.status(201).json(nuevoMorfema);
    } catch (error) {
        return res.status(500).json({ message: 'Error al crear el morfema.' });
    }
});

module.exports = router_morfemas;
