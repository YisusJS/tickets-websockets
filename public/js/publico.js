const socket = io();

socket.on("traer-publico", (payload) => {
//   const audio = new Audio("./audio/new-ticket.mp3");
//   audio.play();
  for (let i = 0; i < payload.length; i++) {
    newTicket2(payload[i]);
  }
});

socket.on("publico", (payload) => {
  if (payload.length != 0) {
    const audio = new Audio("./audio/new-ticket.mp3");
    audio.play();
    newTicket(payload);
  }
});

const newTicket = (payload) => {
  const tabla = document.getElementById("tabla");
  const tr = document.createElement("tr");
  const td = document.createElement("td");
  const span = document.createElement("span");
  const br = document.createElement("br");
  const span2 = document.createElement("span");
  span.setAttribute("class", "ticket-secundario");
  span2.setAttribute("id", "lblEscritorio2");

  for (let i = 0; i < payload.length; i++) {
    let iteracion = payload[i];
    span.textContent = `${iteracion[1]}`;
    span2.textContent = `${iteracion[0]}`;
  }

  td.appendChild(span);
  td.appendChild(br);
  td.appendChild(span2);
  tr.appendChild(td);
  tabla.appendChild(tr);
};

const newTicket2 = (payload) => {
  const tabla = document.getElementById("tabla");
  const tr = document.createElement("tr");
  const td = document.createElement("td");
  const span = document.createElement("span");
  const br = document.createElement("br");
  const span2 = document.createElement("span");
  span.setAttribute("class", "ticket-secundario");
  span2.setAttribute("id", "lblEscritorio2");

  span.textContent = `${payload[1]}`;
  span2.textContent = `${payload[0]}`;

  td.appendChild(span);
  td.appendChild(br);
  td.appendChild(span2);
  tr.appendChild(td);
  tabla.appendChild(tr);
};
