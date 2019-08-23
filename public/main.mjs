(async () => {
  if (typeof io === 'undefined')
    throw new ReferenceError('socket.io client is missing.');
  const { Socket } = await import('./lib/Socket.mjs');
  new Socket(io());
})();
