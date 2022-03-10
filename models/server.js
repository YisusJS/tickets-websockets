// Importamos http
import http from 'http'
// Importamos express
import express from "express";
// Importamos socket.io
import * as io from "socket.io"

// Importamos los sockets
import { socketController } from "../sockets/controller.js"

class Server {
  constructor() {
    //Instanciamos express
    this.app = express();
    //Definimos el puerto en una variable de entorno
    this.port = process.env.PORT;
    //Creamos el server usando express como plantilla 
    this.server = http.createServer(this.app)
    // Insertamos sockets en el "nuevo server"
    this.io = new io.Server(this.server)
    //Llamar middlewares
    this.middlewares();
    // Llamamos sockets
    this.sockets();
  }

  sockets(){
    this.io.on('connection', socketController)
  }

  middlewares() {
    this.app.use(express.static("public"));
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Servidor iniciado en el puerto ${this.port}`);
    });
  }
}

export { Server };
