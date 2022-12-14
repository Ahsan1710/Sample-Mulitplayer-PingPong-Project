const http = require("http");
const io = require("socket.io");

const apiServer = require("./api");
const sockets = require("./sockets");

const httpServer = http.createServer(apiServer);
const socketServer = io(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const PORT = 3000;

httpServer.listen(PORT, () => {
  console.log(`Server is listenning on ${PORT}...`);
});

sockets.listen(socketServer);
