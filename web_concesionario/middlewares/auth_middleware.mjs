export function authMiddleware(req, res, next) {
  if (!req.session.usuario) {
    return res.redirect("/")
  }
  next()
}

export function adminMiddleware(req, res, next) {
  if (req.session.usuario?.rol !== "admin") {
    return res.redirect("/")
  }
  next()
}

export function clienteMiddleware(req, res, next) {
  if (req.session.usuario?.rol !== "cliente") {
    return res.redirect("/")
  }
  next()
}
