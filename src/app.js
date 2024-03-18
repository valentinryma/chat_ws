const express = require("express"); // ---------|> Dependencias ─┐
const handlebars = require("express-handlebars"); //|
const { Server } = require("socket.io"); //|
const viewsRouter = require(`${__dirname}/routes/views.js`); //|
const app = express(); //|
// --------------------------------------------------------------┘

// JSON & Handlebars - Config.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/../public`));
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

// Router Views
app.use("/", viewsRouter);

// HTTP Server
const PORT = process.env.PORT || 8080;
const httpServer = app.listen(PORT, () => {
  console.log(`Server on: http://localhost:${PORT}/`);
});

// WS Server
const io = new Server(httpServer);

const messageLogs = [];

io.on("connection", (clientSocket) => {
  // Cuando un cliente se haya conectado, reenviarle todos los mensajes.
  clientSocket.emit("messageLogs", messageLogs);

  // Cuando llegue un mensaje nuevo, enviarselo a todos los usuarios.
  clientSocket.on("message", (data) => {
    messageLogs.push(data);
    io.emit("message", data); // Reenviamos la data.
  });

  // Cuando se una un cliente, notificar al resto.
  clientSocket.on("user-joined", (user) => {
    clientSocket.broadcast.emit("user-joined", user);
  });
});
