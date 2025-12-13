import {
  obtenerUsuarioPorEmail,
  crearUsuario
} from "../repositories/usuarios.repository.mjs"

export async function login(req, res) {
  try {
    let { email } = req.body
    email = email.trim().toLowerCase()

    const usuario = await obtenerUsuarioPorEmail(email)

    if (!usuario) {
      return res.status(404).json({
        error: "Usuario no encontrado"
      })
    }

    res.json({
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
      }
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error en login" })
  }
}

export async function register(req, res) {
  try {
    let { nombre, email } = req.body
    email = email.trim().toLowerCase()

    const existente = await obtenerUsuarioPorEmail(email)
    if (existente) {
      return res.status(400).json({
        error: "El email ya está registrado"
      })
    }

    const usuario = await crearUsuario({ nombre, email })

    res.status(201).json({
      usuario
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error en registro" })
  }
}
