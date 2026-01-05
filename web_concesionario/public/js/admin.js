function toggleFormulario() {
  const form = document.getElementById("formulario-coche")
  form.style.display = form.style.display === "none" ? "block" : "none"
}

async function crearCoche() {
  const coche = {
    marca: document.getElementById("marca").value,
    modelo: document.getElementById("modelo").value,
    precio: Number(document.getElementById("precio").value),
    tipo: document.getElementById("tipo").value,
    imagen: document.getElementById("imagen").value,
    estado: document.getElementById("estado").value,
    visible: document.getElementById("visible").value === "true"
  }

  const response = await fetch("http://localhost:3000/api/coches", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(coche)
  })

  if (!response.ok) {
    alert("Error al crear el coche")
    return
  }

  const nuevo = await response.json()

  const contenedor = document.getElementById("lista-coches")
  contenedor.insertAdjacentHTML("afterbegin", `
    <div class="card" id="coche-${nuevo.id}">
      <img src="${nuevo.imagen}">
      <div class="info">
        <h3>${nuevo.marca} ${nuevo.modelo}</h3>
        <p><strong>Precio:</strong> ${nuevo.precio} €</p>
        <p><strong>Estado:</strong> <span class="estado-text">${nuevo.estado}</span></p>
        <p><strong>Visible:</strong> <span class="visible-text">${nuevo.visible ? "Sí" : "No"}</span></p>
      </div>
    </div>
  `)

  document.getElementById("formulario-coche").style.display = "none"
}

async function cambiarEstado(id, estado) {
  await fetch(`http://localhost:3000/api/coches/${id}/estado`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ estado })
  })
  document.querySelector(`#coche-${id} .estado-text`).textContent = estado
}

async function cambiarVisibilidad(id, visible) {
  await fetch(`http://localhost:3000/api/coches/${id}/visible`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ visible })
  })
  document.querySelector(`#coche-${id} .visible-text`).textContent =
    visible ? "Sí" : "No"
}

async function eliminarCoche(id) {
  await fetch(`http://localhost:3000/api/coches/${id}`, {
    method: "DELETE"
  })
  document.getElementById(`coche-${id}`).remove()
}
