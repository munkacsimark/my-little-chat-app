class Socket {
  constructor(socket) {
    if (!socket) throw new ReferenceError('socket is required.');
    this.socket = socket;
    this.listenForMessages();
  }

  listenForMessages = () => {
    this.socket.on('chat message', message => {
      console.log(message);
    });
  }
}

export { Socket };