
export async function login(req, res) {
  try {
    const { email } = req.body

    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    })

    const data = await response.json()

    if (!response.ok) {
      return res.status(401).render("login", {
        error: data.error || "Error al iniciar sesión"
      })
    }

    req.session.usuario = data

    if (data.rol === "admin") {
      res.redirect("/admin")
    } else {
      res.redirect("/cliente")
    }
  } catch (error) {
    console.error(error)
    res.render("login", { error: "Error de conexión con la API" })
  }
}


export async function register(req, res) {
  try {
    const { nombre, email, rol } = req.body

    const response = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, email, rol })
    })

    const data = await response.json()

    if (!response.ok) {
      return res.render("register", {
        error: data.error || "Error al registrarse"
      })
    }

    req.session.usuario = data
    res.redirect(rol === "admin" ? "/admin" : "/cliente")
  } catch (error) {
    console.error(error)
    res.render("register", { error: "Error de conexión con la API" })
  }
}
