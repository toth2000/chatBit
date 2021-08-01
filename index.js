const express = require('express');
const http = require('http');
const cors = require('cors');

const router = require('./router');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server,{
    cors:{
        origin:'*',
    }
});

app.use(router);
app.use(cors());

io.on("connect", (socket)=>{ //To check when user is connected
    console.log('A new connection');

    socket.on('join', ({name, room}, callback )=>{ //Receiving Data from client
        console.log('Index file started');

        const { error, user } = addUser({ id: socket.id, name, room });
        //if(error)
           // return callback(error);

        console.log(user);
        socket.emit('message', {user: 'BotAdmin', text:`${user.name}, welcome to the room ${user.room}`});
        socket.broadcast.to(user.room).emit('message', {user: 'BotAdmin', text: `${user.name} has joined the room.` });
        /**The broadcast method send message to everyone in the room other than the user that joined */

        socket.join(user.room); //It joins a user in a room, it is a built in method.

        io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)});
        //It send broadcast to everyone

      //  callback(); //Doesn't return error
    });
    
    socket.on('sendMessage',  (message, callback) => {
        const user = getUser(socket.id);
        console.log('Message in Server: ', message);
        io.to(user.room).emit('message', {user: user.name, text: message}); //emit event to particular room  
        callback();
    });

    socket.on('disconnect', ()=>{ //To check when user is disconnected
        console.log('Disconnected'); 
        const user = removeUser(socket.id);

        if(user)
        {   
            io.to(user.room).emit('message', {user: 'BotAdmin', text: `${user.name} has left`});
            io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)});
        }
    });

});

server.listen(PORT, ()=> console.log(`Listening to Port ${PORT}`));
