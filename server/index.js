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
  socket.on("userJoined", (data) => {
    // console.log("DATA = ", data);
    const { roomID, userID, name, host, presenter } = data;
    socket.join(roomID);
    socket.emit("userIsJoined", { success: true });
  });
});

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Server running on Port ${port}`);
});
