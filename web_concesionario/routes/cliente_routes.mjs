import { Router } from "express"
import { clienteMiddleware } from "../middlewares/auth_middleware.mjs"
import { panelCliente } from "../controllers/cliente.controller.mjs"

const router = Router()

router.get("/", clienteMiddleware, panelCliente)

export default router
