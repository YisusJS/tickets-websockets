const socket = io();
// Tomamos el elemento del DOM
const nuevo_escritorio = document.querySelector("#nombre-escritorio");
const alerta = document.getElementById("alerta");
const tickets = document.getElementById("tickets");
const atender = document.getElementById("atender");
const ticket_actual = document.getElementById("ticket-actual");

// Generamos el evento del boton atender siguiente ticket
atender.addEventListener("click", () => {
  socket.emit("tomar-ticket", null, (ticket) => {
    if (ticket == null) {
      ticket_actual.innerText = `Ticket ...`;
      alerta.style.display = "inline-block";
    } else {
      ticket_actual.innerText = `Ticket ${ticket}`;
      let publico = [];
      publico.push(escritorio);
      publico.push(ticket_actual.textContent);
      socket.emit("escritorio", publico);
    }
  });
  socket.emit("traer-ticket", null, (a) => {
    tickets.innerText = `${a}`;
  });
  
  if (tickets.textContent == 1) {
    tickets.style.display = "none";
  }
});

// Eliminamos el display por defecto de la alerta
alerta.style.display = "none";

// Recibimos el total de tickets
socket.on("total-tickets", (payload) => {
  tickets.innerText = `${payload}`;
});

// Obtener usuario de una URL "action del formulario"
const searchParams = new URLSearchParams(window.location.search);
if (!searchParams.has("escritorio")) {
  throw new Error("El escritorio es obligatorio");
}
const escritorio = searchParams.get("escritorio");
nuevo_escritorio.innerText = `${escritorio}`;
