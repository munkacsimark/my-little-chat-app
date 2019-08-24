const http = require('http');
const logger = require('./lib/Logger');

const port = 3001;
const server = http.createServer().listen(port);
const io = require('socket.io')(server);

io.on('connection', socket => {
  logger.log('A user connected', logger.color.GREEN);
  io.emit('message', {user: 'server', message: 'User joined!'});
  socket.on('disconnect', function(){
    logger.log('A user disconnected', logger.color.RED);
    io.emit('message', {user: 'server', message: 'User disconnected!'});
  });
  socket.on('message', message => {
    logger.log(`[msg]: ${message.user}: ${message.message}`);
    io.emit('message', message);
  });
});

console.log(`Server running at http://127.0.0.1:${port}`);
