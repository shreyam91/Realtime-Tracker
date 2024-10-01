const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const socketio = require("socket.io");

const server = http.createServer(app);
const io = socketio(server);

// Set the view engine to EJS
app.set("view engine", "ejs");

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Socket.io connection
io.on("connection", function(socket) {
    socket.on("send-location", function(data){
        io.emit("receive-location", {id: socket.id, ...data});
    });
    // console.log("Connected");
    socket.on("disconnect", function(){
        io.emit("user-disconnected", socket.id)
    })
});

// Render the index view on the root route
app.get("/", function(req, res) {
    res.render('index');
});

// Start the server
server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
