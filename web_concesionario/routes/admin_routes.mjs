import { Router } from "express"
import { panelAdmin } from "../controllers/admin.controller.mjs"
import { authMiddleware } from "../middlewares/auth_middleware.mjs"

const router = Router()

router.get("/", authMiddleware, panelAdmin)

export default router
