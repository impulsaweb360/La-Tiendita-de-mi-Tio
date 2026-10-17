
const PRECIO = 3.50;

// Reemplaza este número por tu WhatsApp.
// Usa 51 + tu número peruano, sin + ni espacios.
const WHATSAPP = "51987643992";

const cantidades = {
  coca: 0,
  inca: 0
};

const productos = {
  coca: { nombre: "Coca-Cola personal", precio: PRECIO },
  inca: { nombre: "Inca Kola personal", precio: PRECIO }
};

const dinero = (cantidad) => `S/ ${cantidad.toFixed(2)}`;

function actualizarTienda() {
  document.getElementById("cantidad-coca").textContent =
    cantidades.coca;

  document.getElementById("cantidad-inca").textContent =
    cantidades.inca;

  const unidades = cantidades.coca + cantidades.inca;
  const total = unidades * PRECIO;

  document.getElementById("total").textContent =
    `Total: ${dinero(total)}`;

  const resumen = [];

  for (const id in cantidades) {
    if (cantidades[id] > 0) {
      resumen.push(
        `${cantidades[id]} x ${productos[id].nombre}`
      );
    }
  }

  document.getElementById("resumen").textContent =
    resumen.length
      ? resumen.join(" · ")
      : "Todavía no has elegido bebidas.";
}

document.querySelectorAll("[data-change]").forEach((boton) => {
  boton.addEventListener("click", () => {
    const id = boton.dataset.product;
    const cambio = Number(boton.dataset.change);

    cantidades[id] = Math.max(0, cantidades[id] + cambio);
    actualizarTienda();
  });
});

document.getElementById("enviar-pedido").addEventListener(
  "click",
  () => {
    const nombre = document.getElementById("nombre").value.trim();
    const unidades = cantidades.coca + cantidades.inca;

    if (!unidades) {
      alert("Primero elige al menos una gaseosa.");
      return;
    }

    if (!nombre) {
      alert("Escribe tu nombre para identificar tu pedido.");
      document.getElementById("nombre").focus();
      return;
    }

    if (!/^51\d{9}$/.test(WHATSAPP)) {
      alert("Configura primero tu número de WhatsApp en script.js.");
      return;
    }

    const total = unidades * PRECIO;
    const lineas = [
      "¡Hola! Quiero hacer un pedido.",
      `Nombre: ${nombre}`,
      "",
      ...Object.keys(cantidades)
        .filter((id) => cantidades[id] > 0)
        .map((id) =>
          `${productos[id].nombre}: ${cantidades[id]} x ${
            dinero(productos[id].precio)
          }`
        ),
      "",
      `Total: ${dinero(total)}`,
      "Por favor, confirma la disponibilidad y entrega."
    ];

    const mensaje = encodeURIComponent(lineas.join("\n"));
    const url = `https://wa.me/${WHATSAPP}?text=${mensaje}`;

    window.open(url, "_blank", "noopener,noreferrer");
  }
);

actualizarTienda();
