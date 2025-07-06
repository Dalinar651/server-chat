const express  = require('express');

const app = express();
const router = require('./router'); 

const users = require('./users.ts');

const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ 
    cors: {
    origin: "http://localhost:5173"
  }
});

app.use(router)

io.on("connection", (socket) => {
    console.log("A user connected",socket.id);

    socket.on("joinRoom", ({ roomId, username }, callback) => {

      const {error , user} = users.addUser({id: socket.id, username, roomId});
      if (error) {
        return callback({error});
      }

      socket.join(roomId);
      console.log(`${username} joined room ${roomId}`);
      // Emit an event to the room that a user has joined
      socket.emit("message", {username: "admin", text: `${username}, welcome to the room ${roomId}`});
      socket.broadcast.to(roomId).emit("message", {username: "admin", text: `${username} has joined!`});

      callback();
    });

    socket.on("sendMessage", (message, callback) => {
      const user = users.getUserById(socket.id);

      if (!user) {
        return callback({error: "User not found"});
      }

      io.to(user.roomId).emit("message", {username: user.username, text: message});
      callback();
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected",socket.id);

        const user = users.removeUser(socket.id);
        if (user) {
            console.log(`${user.username} left room ${user.roomId}`);
            // Emit an event to the room that a user has left
            io.to(user.roomId).emit("message", {username: "admin", text: `${user.username} has left!`});
        }
    });
  // ...
});

httpServer.listen(3000,() => {
    console.log("listening on *:3000");
});