import e from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = e();

const server = createServer(app);

const io = new Server(server);

//routes

app.get("/", (req, res) => {
  res.send(
    "This is the Server of Collab Palette - A fully-functional realtime whiteboard"
  );
});

io.on("connection", (socket) => {
  console.log("User Connected!");
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server running on Port ${port}`);
});
