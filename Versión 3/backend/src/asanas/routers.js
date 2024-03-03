//importación de router de express y de service
const { Router } = require("express");
const { consult_asanas, guardarAsana, eliminarAsanaYDescomposiciones,consult_des } = require("./service.js");

//creación de un objeto tipo router
const router_asanas = Router();

// Definición ruta 
router_asanas.get("/Posturas", async(req, res) => {
    try {
        // Obtención de la data
        const asanas = await consult_asanas();
        // Respuesta JSON
        return res.json(asanas);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Error al obtener las posturas.' });
    }
});

router_asanas.get("/Posturas/des", async(req, res) => {
    try {
        // Obtención de la data
        const asanas = await consult_des();
        // Respuesta JSON
        return res.json(asanas);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Error al obtener las posturas.' });
    }
});

router_asanas.post("/Posturas", async (req, res) => {
    try {
        // Obtener los datos de la asana y los IDs de los morfemas del cuerpo de la solicitud
        const { asana, idsMorfemas } = req.body;

        // Verificar que se proporcionen los datos necesarios
        if (!asana || !idsMorfemas || !Array.isArray(idsMorfemas) || idsMorfemas.length === 0) {
            return res.status(400).json({ message: 'Faltan datos para crear la asana y su descomposición.' });
        }

        // Llamar a la función para guardar la asana y su descomposición
        await guardarAsana(asana, idsMorfemas);

        return res.status(201).json({ message: 'exito' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error al guardar la asana y su descomposición.' });
    }
});

router_asanas.delete('/Posturas/:idAsana', async (req, res) => {
    try {
        const idAsana = req.params.idAsana; // Obtener el ID de la asana de los parámetros de la URL
        
        // Llamar a la función para eliminar la asana y sus descomposiciones
        const resultado = await eliminarAsanaYDescomposiciones(idAsana);

        // Enviar una respuesta con el resultado de la eliminación
        res.json({
            mensaje: `Se eliminaron ${resultado.descomposicionesEliminadas} descomposiciones`,
            asanaEliminada: resultado.asanaEliminada
        });
    } catch (error) {
        console.error('Error al eliminar la asana y las descomposiciones:', error);
        res.status(500).json({ error: 'Error al eliminar la asana y las descomposiciones' });
    }
});


//exportación del router
module.exports = router_asanas;