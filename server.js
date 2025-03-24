const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("send_message", (data) => {
        io.emit("receive_message", { username: data.username, text: data.text });
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});


server.listen(5000, () => {
    console.log("Server is running on port 5000");
});
