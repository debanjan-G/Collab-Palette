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

let imageURL, userRoom;
io.on("connection", (socket) => {
  // When a new user joins the room
  socket.on("userJoined", (data) => {
    console.log("userJoined Server Event Handler Fired!!!");

    const { roomID, userID, name, host, presenter } = data;
    console.log("ROOM ID = ", roomID);

    // Store the roomID in the socket object
    userRoom = roomID;
    console.log("userRoom = ", userRoom);

    // Socket joins the specified room
    socket.join(roomID);

    // Notify the user that they have successfully joined
    socket.emit("userIsJoined", { success: true });

    // Send the latest whiteboard image to the newly joined user
    socket.emit("whiteboardDataResponse", {
      updatedImage: imageURL,
    });
  });

  // When whiteboard data is updated
  socket.on("whiteboardData", (stageImage) => {
    console.log("whiteboardData Server Handler fired!");

    // Store the latest whiteboard image globally
    imageURL = stageImage;

    console.log("ROOM ID", userRoom);

    if (userRoom) {
      socket.broadcast.to(userRoom).emit("whiteboardDataResponse", {
        updatedImage: stageImage,
      });
      console.log("RESPONSE SENT successfully!");
    }
  });
});

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Server running on Port ${port}`);
});
