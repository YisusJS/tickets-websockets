// Variables del server
const tickets = [];
const publico = [];

const socketController = (socket) => {
  // Mostrar los usuarios conectados
  console.log(`Usuario conectado ${socket.id}`);

  socket.emit("total-tickets", tickets.length);
  socket.emit("traer-publico", publico)

  // Recibir los tickets
  socket.on("nuevo-ticket", (payload, callback) => {
    const total_tickets = tickets.length + 1;
    tickets.push(total_tickets);
    socket.broadcast.emit("total-tickets", tickets.length);
    callback(tickets.length);
  });

  // Tomar los tickets en el escritorio
  // Recibir los tickets
  socket.on("tomar-ticket", (payload, callback) => {
    let ticket_actual = tickets[0];
    tickets.shift();
    socket.emit("ticket-actual", ticket_actual);
    callback(ticket_actual);
  });

  socket.on("traer-ticket", (payload, callback) => {
    callback(tickets.length);
    socket.broadcast.emit("total-tickets", tickets.length);
  });

//   Enviar al público 
  socket.on('escritorio', (payload) => {
      publico.push(payload)
      socket.broadcast.emit("publico", publico)
  })
};

export { socketController };
