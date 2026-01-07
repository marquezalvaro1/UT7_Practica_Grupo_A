import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import session from "express-session"

import authRoutes from "./routes/auth_routes.mjs"
import adminRoutes from "./routes/admin_routes.mjs"


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(express.static(path.join(__dirname, "public")))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
  session({
    secret: "clave-secreta-daw",
    resave: false,
    saveUninitialized: false
  })
)

app.get("/", (req, res) => {
  res.redirect("/login")
})

app.get("/login", (req, res) => {
  res.render("login")
})

app.get("/register", (req, res) => {
  res.render("register")
})

app.use("/", authRoutes)

app.use("/admin", adminRoutes)

app.get("/cliente", async (req, res) => {
  try {
    if (!req.session.usuario) {
      return res.redirect("/login")
    }

    const response = await fetch("http://localhost:3000/api/coches")
    const coches = await response.json()

    const cochesVisibles = coches.filter(
      c => c.visible && c.estado !== "vendido"
    )

    res.render("cliente", {
      coches: cochesVisibles,
      mensaje: req.session.mensaje
    })

    // Mensaje tipo flash
    req.session.mensaje = null

  } catch (error) {
    console.error(error)
    res.send("Error cargando el área de cliente")
  }
})

app.get("/reservar/:id", async (req, res) => {
  try {
    if (!req.session.usuario) {
      return res.redirect("/login")
    }

    const { id } = req.params

    const response = await fetch("http://localhost:3000/api/coches")
    const coches = await response.json()

    const coche = coches.find(c => c.id == id)
    if (!coche) {
      return res.send("Coche no encontrado")
    }

    res.render("reserva", {
      coche,
      usuario: req.session.usuario
    })
  } catch (error) {
    console.error(error)
    res.send("Error cargando la reserva")
  }
})

app.post("/reservar", async (req, res) => {
  try {
    if (!req.session.usuario) {
      return res.redirect("/login")
    }

    const { coche_id } = req.body
    const clienteId = req.session.usuario.id

    const response = await fetch("http://localhost:3000/api/reservas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        coche_id,
        cliente_id: clienteId,
        importe: 100
      })
    })

    const data = await response.json()

    if (!response.ok) {
      req.session.mensaje = data.error
      return res.redirect("/cliente")
    }

    req.session.mensaje = "Coche reservado correctamente"
    res.redirect("/cliente")

  } catch (error) {
    console.error(error)
    res.send("Error realizando la reserva")
  }
})

app.get("/reservas", async (req, res) => {
  try {
    if (!req.session.usuario) {
      return res.redirect("/login")
    }

    const clienteId = req.session.usuario.id

    const response = await fetch(
      `http://localhost:3000/api/reservas/cliente/${clienteId}`
    )

    const reserva = await response.json()

    res.render("reservas", { reserva })

  } catch (error) {
    console.error(error)
    res.send("Error cargando las reservas")
  }
})

app.post("/reservas/cancelar", async (req, res) => {
  try {
    if (!req.session.usuario) {
      return res.redirect("/login")
    }

    const { reserva_id } = req.body

    const response = await fetch(
      `http://localhost:3000/api/reservas/${reserva_id}/cancelar`,
      { method: "PUT" }
    )

    const data = await response.json()

    if (!response.ok) {
      req.session.mensaje = data.error
      return res.redirect("/cliente")
    }

    req.session.mensaje = "Reserva cancelada correctamente"
    res.redirect("/cliente")

  } catch (error) {
    console.error(error)
    res.send("Error cancelando la reserva")
  }
})

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login")
  })
})

app.listen(4000, () => {
  console.log(" Web escuchando en http://localhost:4000")
})
