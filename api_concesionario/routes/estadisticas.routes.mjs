import { Router } from "express"
import {
  getCochesPorEstado,
  getCochesPorVisibilidad,
  getCochesPorMarca,
  getPrecioMedioPorMarca,
  getTopMarcas
} from "../controllers/estadisticas.controller.mjs"

const router = Router()

router.get("/estado", getCochesPorEstado)
router.get("/visibilidad", getCochesPorVisibilidad)
router.get("/marca", getCochesPorMarca)
router.get("/precio-medio", getPrecioMedioPorMarca)
router.get("/top-marcas", getTopMarcas)

export default router