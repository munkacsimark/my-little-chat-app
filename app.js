const app = require('express')();
const http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (reqest, response) => {
  response.sendFile(__dirname + '/public/index.html');
})

io.on('connection', socket => {
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('chat message', message => {
    console.log('message: ', message);
    io.emit('chat message', message);
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
})