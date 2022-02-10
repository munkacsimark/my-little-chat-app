const http = require("http");
const logger = require("./lib/Logger");
const { SERVER_PORT, CLIENT_PORT } = require("./config");

const server = http.createServer().listen(SERVER_PORT);
const io = require("socket.io")(server, {
  cors: {
    origin: `http://127.0.0.1:${CLIENT_PORT}`,
    credentials: true,
  },
});

io.on("connection", (socket) => {
  logger.log("A user connected", logger.color.GREEN);
  io.emit("message", { user: "server", message: "User joined!" });
  socket.on("disconnect", function () {
    logger.log("A user disconnected", logger.color.RED);
    io.emit("message", { user: "server", message: "User disconnected!" });
  });
  socket.on("message", (message) => {
    logger.log(`[msg]: ${message.user}: ${message.message}`);
    io.emit("message", message);
  });
});

console.log(`Server running at http://127.0.0.1:${SERVER_PORT}`);
