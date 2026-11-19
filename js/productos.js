import { obtenerCarrito } from "./storage.js";
import { actualizarContador, formatearPrecio } from "./ui.js";
import { agregarAlCarrito } from "./funcionesCarrito.js";

let productos = [];

const crearTarjeta = (producto) => {
  const tarjeta = document.createElement("article");
  tarjeta.classList.add("card");

  const img = document.createElement("img");
  img.src = `../${producto.img}`;
  img.alt = producto.nombre;
  img.loading = "lazy";

  const cuerpo = document.createElement("div");
  cuerpo.classList.add("card-cuerpo");

  const titulo = document.createElement("h3");
  titulo.textContent = producto.nombre;

  const desc = document.createElement("p");
  desc.classList.add("card-desc");
  desc.textContent = producto.descripcion || "";

  const precio = document.createElement("p");
  precio.classList.add("precio");
  precio.textContent = formatearPrecio(producto.precio);

  const boton = document.createElement("button");
  boton.classList.add("btn", "btn-primario");
  boton.textContent = "Agregar al carrito";
  boton.addEventListener("click", () => agregarAlCarrito(producto));

  cuerpo.append(titulo, desc, precio, boton);
  tarjeta.append(img, cuerpo);
  return tarjeta;
};

const renderizarProductos = () => {
  const contenedor = document.getElementById("contenedor-tarjetas");
  const texto = document.getElementById("buscador").value.trim().toLowerCase();
  const orden = document.getElementById("orden").value;

  let lista = productos.filter((p) => p.nombre.toLowerCase().includes(texto));
  if (orden === "menor") lista.sort((a, b) => a.precio - b.precio);
  if (orden === "mayor") lista.sort((a, b) => b.precio - a.precio);
  if (orden === "az") lista.sort((a, b) => a.nombre.localeCompare(b.nombre));

  contenedor.innerHTML = "";
  if (!lista.length) {
    contenedor.innerHTML = `<p class="mensaje-vacio">No encontramos productos</p>`;
    return;
  }
  contenedor.append(...lista.map(crearTarjeta));
};

const cargarProductos = async () => {
  try {
    const respuesta = await fetch("../data/productos.json");
    if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
    productos = await respuesta.json();
    renderizarProductos();
  } catch (error) {
    console.error(error);
    document.getElementById("contenedor-tarjetas").innerHTML =
      `<p class="mensaje-vacio">No pudimos cargar los productos.</p>`;
  }
};

document.addEventListener("DOMContentLoaded", () => {
  actualizarContador(obtenerCarrito());
  document.getElementById("buscador").addEventListener("input", renderizarProductos);
  document.getElementById("orden").addEventListener("change", renderizarProductos);
  cargarProductos();
});
