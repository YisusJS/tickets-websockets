// Importamos los sockets
const socket = io();

// Tomar elementos del DOM
const nuevo_ticket = document.querySelector("#nuevo-ticket");
const generar_ticket = document.querySelector("#generar-ticket");

// Recibir todos los tickets del server
socket.on("total-tickets", (payload) => {
  nuevo_ticket.innerText = `Ticket ${payload}`;
});

// Agregar un nuevo ticket y enviar el total del ticket
generar_ticket.addEventListener("click", () => {
  socket.emit("nuevo-ticket", null, (ticket) => {
    nuevo_ticket.innerText = `Ticket ${ticket}`;
  });
});
