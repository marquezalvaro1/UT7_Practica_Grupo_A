import express from "express"
import cors from "cors"

import cochesRoutes from "./routes/coches.routes.mjs"
import authRoutes from "./routes/auth.routes.mjs"
import reservasRoutes from "./routes/reservas.routes.mjs"
import estadisticasRoutes from "./routes/estadisticas.routes.mjs"


const app = express()

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/auth", authRoutes)
app.use("/api/coches", cochesRoutes)
app.use("/api/reservas", reservasRoutes)
app.use("/api/estadisticas", estadisticasRoutes)


const PORT = 3000
app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`)
})
