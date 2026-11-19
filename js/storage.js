const KEY = "carrito";

export const guardarCarrito = (carrito) => {
  localStorage.setItem(KEY, JSON.stringify(carrito));
};

export const obtenerCarrito = () => {
  try {
    const datos = JSON.parse(localStorage.getItem(KEY));
    return Array.isArray(datos)
      ? datos.map((p) => ({ ...p, cantidad: p.cantidad || 1 }))
      : [];
  } catch {
    return [];
  }
};

export const vaciarCarritoStorage = () => localStorage.removeItem(KEY);
