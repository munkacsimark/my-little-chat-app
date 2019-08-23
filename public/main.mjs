(async () => {
  if (typeof io === 'undefined')
    throw new ReferenceError('socket.io client is missing.');

  const serverAddress = 'http://127.0.0.1:3001';
  const { Socket } = await import('./lib/Socket.mjs');

  new Socket(io(serverAddress));
})();
