import { cambiarCantidad, eliminarProducto, vaciarCarrito } from "./funcionesCarrito.js";
import { obtenerCarrito } from "./storage.js";
import { actualizarContador, confirmar, formatearPrecio, totalPrecio, totalUnidades } from "./ui.js";

const crearBoton = (texto, clases, onClick, aria) => {
  const b = document.createElement("button");
  b.className = clases;
  b.textContent = texto;
  if (aria) b.setAttribute("aria-label", aria);
  b.addEventListener("click", onClick);
  return b;
};

const renderizarCarrito = () => {
  const carrito = obtenerCarrito();
  actualizarContador(carrito);

  const contenedor = document.getElementById("contenedor-carrito");
  const acciones = document.getElementById("acciones-carrito");
  const resumen = document.getElementById("resumen-carrito");
  contenedor.innerHTML = acciones.innerHTML = resumen.innerHTML = "";

  if (!carrito.length) {
    contenedor.innerHTML = `<p class="mensaje-vacio"><img width="40" height="40" src="https://img.icons8.com/3d-sugary/100/shopping-cart.png" alt="shopping-cart"/> está vacío<br><a href="../index.html">Volver a la tienda</a></p>`;
    return;
  }

  carrito.forEach((p) => {
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("card");

    const img = document.createElement("img");
    img.src = `../${p.img}`;
    img.alt = p.nombre;

    const cuerpo = document.createElement("div");
    cuerpo.classList.add("card-cuerpo");

    const titulo = document.createElement("h3");
    titulo.textContent = p.nombre;

    const precio = document.createElement("p");
    precio.classList.add("precio");
    precio.textContent = `${formatearPrecio(p.precio)} c/u`;

    const cantidad = document.createElement("div");
    cantidad.classList.add("cantidad");
    const num = document.createElement("span");
    num.textContent = p.cantidad;
    cantidad.append(
      crearBoton("−", "btn-cantidad", () => { cambiarCantidad(p.id, -1); renderizarCarrito(); }, `Quitar una unidad de ${p.nombre}`),
      num,
      crearBoton("+", "btn-cantidad", () => { cambiarCantidad(p.id, 1); renderizarCarrito(); }, `Agregar una unidad de ${p.nombre}`)
    );

    const subtotal = document.createElement("p");
    subtotal.classList.add("subtotal");
    subtotal.textContent = `Subtotal: ${formatearPrecio(p.precio * p.cantidad)}`;

    const eliminar = crearBoton("Eliminar", "btn btn-peligro", () => { eliminarProducto(p.id); renderizarCarrito(); });

    cuerpo.append(titulo, precio, cantidad, subtotal, eliminar);
    tarjeta.append(img, cuerpo);
    contenedor.appendChild(tarjeta);
  });

  acciones.appendChild(
    crearBoton("Vaciar carrito", "btn btn-secundario", async () => {
      if (await confirmar("Vaciar el carrito?", "Se quitarán todos los productos.", "Sí, vaciar")) {
        vaciarCarrito();
        renderizarCarrito();
      }
    })
  );

  resumen.innerHTML = `
    <h2>Resumen</h2>
    <p>Productos: <strong>${totalUnidades(carrito)}</strong></p>
    <p class="total">Total: ${formatearPrecio(totalPrecio(carrito))}</p>`;
  resumen.appendChild(
    crearBoton("Finalizar compra", "btn btn-primario", async () => {
      const total = formatearPrecio(totalPrecio(carrito));
      if (!(await confirmar("Confirmar compra", `El total es ${total}.`, "Comprar"))) return;
      vaciarCarrito();
      renderizarCarrito();
      Swal.fire({ icon: "success", title: "¡Gracias por tu compra!", text: "Te enviaremos los detalles por email.", confirmButtonColor: "#d9622b" });
    })
  );
};

document.addEventListener("DOMContentLoaded", renderizarCarrito);
