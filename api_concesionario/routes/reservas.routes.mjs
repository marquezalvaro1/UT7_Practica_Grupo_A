import express from "express"
import {
  reservarCoche,
  obtenerReservaCliente,
  cancelarReservaCliente
} from "../controllers/reservas.controller.mjs"

const router = express.Router()

router.post("/", reservarCoche)
router.get("/cliente/:id", obtenerReservaCliente)
router.put("/:id/cancelar", cancelarReservaCliente)

export default router