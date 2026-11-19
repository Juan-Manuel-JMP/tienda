import { guardarCarrito, obtenerCarrito, vaciarCarritoStorage } from "./storage.js";
import { actualizarContador, mostrarMensaje } from "./ui.js";

export const agregarAlCarrito = (producto) => {
  const carrito = obtenerCarrito();
  const existente = carrito.find((p) => p.id === producto.id);

  if (existente) {
    existente.cantidad++;
  } else {
    const { id, nombre, precio, img } = producto;
    carrito.push({ id, nombre, precio, img, cantidad: 1 });
  }

  guardarCarrito(carrito);
  actualizarContador(carrito);
  mostrarMensaje(`${producto.nombre} agregado al carrito`);
};

// si la canidad llega a 0 se elimina el producto
export const cambiarCantidad = (id, delta) => {
  let carrito = obtenerCarrito();
  const producto = carrito.find((p) => p.id === id);
  if (!producto) return;

  producto.cantidad += delta;
  if (producto.cantidad <= 0) {
    carrito = carrito.filter((p) => p.id !== id);
  }

  guardarCarrito(carrito);
  actualizarContador(carrito);
};

export const eliminarProducto = (id) => {
  const carrito = obtenerCarrito().filter((p) => p.id !== id);
  guardarCarrito(carrito);
  actualizarContador(carrito);
  mostrarMensaje("Producto eliminado", "info");
};

export const vaciarCarrito = () => {
  vaciarCarritoStorage();
  actualizarContador([]);
  mostrarMensaje("Carrito vaciado", "info");
};
