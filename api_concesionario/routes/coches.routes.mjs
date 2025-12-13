import express from "express"
import {
  getCoches,
  postCoche,
  putEstadoCoche,
  putVisibilidadCoche,
  deleteCoche
} from "../controllers/coches.controller.mjs"

const router = express.Router()

router.get("/", getCoches)

router.post("/", postCoche)

router.put("/:id/estado", putEstadoCoche)

router.put("/:id/visible", putVisibilidadCoche)

router.delete("/:id", deleteCoche)

export default router
