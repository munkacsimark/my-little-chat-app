class Socket {
  #socket;

  constructor(serverAddress) {
    if (typeof io === "undefined")
      throw new ReferenceError("socket.io client is missing.");

    this.#socket = io(serverAddress);
  }

  listenForMessages(callback) {
    this.#socket.on("message", callback);
  }

  sendMessage(message) {
    this.#socket.emit("message", message);
  }
}

export { Socket };
