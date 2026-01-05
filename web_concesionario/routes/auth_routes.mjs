import { Router } from "express"

const router = Router()


router.post("/login", async (req, res) => {
  let { email } = req.body
  email = email.trim().toLowerCase()

  try {
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    })

    const data = await response.json()

    if (!response.ok) {
      return res.render("login", { error: data.error })
    }

    req.session.usuario = data.usuario

    if (data.usuario.rol === "admin") {
      return res.redirect("/admin")
    }

    res.redirect("/cliente")

  } catch (error) {
    console.error(error)
    res.render("login", { error: "No se puede conectar con la API" })
  }
})


router.post("/register", async (req, res) => {
  let { nombre, email } = req.body
  email = email.trim().toLowerCase()

  try {
    const response = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, email })
    })

    const data = await response.json()

    if (!response.ok) {
      return res.render("register", { error: data.error })
    }

    res.redirect("/login")

  } catch (error) {
    console.error(error)
    res.render("register", { error: "No se puede conectar con la API" })
  }
})

export default router
