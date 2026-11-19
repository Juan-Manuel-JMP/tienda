import { obtenerCarrito } from "./storage.js";
import { actualizarContador } from "./ui.js";

const emailValido = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

document.addEventListener("DOMContentLoaded", () => {
  actualizarContador(obtenerCarrito());

  const form = document.getElementById("form-contacto");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = form.email.value.trim();
    const mensaje = form.mensaje.value.trim();

    if (!emailValido(email)) {
      return Swal.fire({ icon: "error", title: "Email inválido", text: "Revisá que tenga formato nombre@undominio.com", confirmButtonColor: "#d9622b" });
    }
    if (mensaje.length < 10) {
      return Swal.fire({ icon: "error", title: "Mensaje muy corto", text: "Escribí al menos 10 caracteres.", confirmButtonColor: "#d9622b" });
    }

    Swal.fire({ icon: "success", title: "Mensaje enviado!", text: "Te responderemos a la brevedad.", confirmButtonColor: "#d9622b" });
    form.reset();
  });
});
