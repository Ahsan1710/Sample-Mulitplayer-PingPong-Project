let playersCount = 0;

function listen(io) {
  let room;
  const pongNamespace = io.of("/pong");

  pongNamespace.on("connection", (socket) => {
    console.log(`A new user connected`);

    socket.on("ready", () => {
      room = "room" + Math.floor(playersCount / 2);
      socket.join(room);
      console.log(`Player ready ${socket.id} in ${room}`);

      playersCount++;

      if (playersCount % 2 === 0) {
        console.log("2 players are ready");
        pongNamespace.in(room).emit("startGame", socket.id, room);
      }
    });

    socket.on("paddleMove", (paddleData) => {
      socket.to(room).emit("paddleMove", paddleData, room);
    });

    socket.on("ballMove", (ballData) => {
      socket.to(room).emit("ballMove", ballData, room);
    });

    socket.on("disconnect", (reason) => {
      console.log(`user is disconnected due to following reason: ${reason}`);
      socket.leave(room);
    });
  });
}

module.exports = {
  listen,
};
