export const formatearPrecio = (n) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(n);

export const totalUnidades = (carrito) =>
  carrito.reduce((acc, p) => acc + p.cantidad, 0);

export const totalPrecio = (carrito) =>
  carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

export const actualizarContador = (carrito) => {
  const contador = document.getElementById("contador-carrito");
  if (contador) contador.textContent = totalUnidades(carrito) || "";
};

// notificación toast (SweetAlert2)
export const mostrarMensaje = (texto, icono = "success") => {
  if (!window.Swal) return alert(texto);
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: icono,
    title: texto,
    showConfirmButton: false,
    timer: 1800,
    timerProgressBar: true,
    iconColor: "#d9622b",
  });
};

// confirmación; devuelve true/false
export const confirmar = async (titulo, texto, botonOk = "Sí, continuar") => {
  if (!window.Swal) return confirm(`${titulo}\n${texto}`);
  const { isConfirmed } = await Swal.fire({
    title: titulo,
    text: texto,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: botonOk,
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#d9622b",
    cancelButtonColor: "#7a6a5e",
  });
  return isConfirmed;
};
