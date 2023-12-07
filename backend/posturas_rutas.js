import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Definir rutas
router.get("/Posturas", async (req, res) => {
  const asanas = await prisma.asanas.findMany();
  console.log(asanas);
  return res.json(asanas);
});

router.get("/Posturas/:sanscrito", async (req, res) => {
  const sanscritoLowerCase = req.params.sanscrito.toLowerCase();

  const registrosSimilares = await prisma.asanas.findMany({
      where: {
          sanscrito: {
              contains: sanscritoLowerCase,
          },
      }
  });

  if (!registrosSimilares || registrosSimilares.length === 0) {
      return res.status(404).json({ error: "Elemento no encontrado" });
  }

  return res.json(registrosSimilares);
});

// Exportar el enrutador
export default router;