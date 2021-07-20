const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

//middleware
app.use(express.static('client'));

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); //con el * estoy permitiendo todas las rutas a saco
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.get('/hola-mundo', (req, res) => {
    res.status(200).send('hola mundo desde esta app para entrenar con socket.io');
});


server.listen(6677, () => {
    console.log('servidor funcionando en http://localhost:6677');
});





let messages = [{
    id: 1,
    text: 'Bienvenidos al mi chat privado con socket.io',
    nickname: 'Bot_Ricardo'
}];

//socket.io
io.on('connection', (socket) => {
    console.log("El cliente con IP: " + socket.handshake.address + "se ha conectado...");
    socket.on('disconnect', () => console.log('       un usuario se ha desconectado') );

    socket.emit('mensaje', messages);

    socket.on('add-message', (data) => {
        messages.push(data);
        io.sockets.emit('mensaje', messages);
    })
});


