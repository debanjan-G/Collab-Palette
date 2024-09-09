# CollabPalette: Collaborative Whiteboard Application

A real-time collaborative whiteboard application built using **React**, **Express**, **Konva**, and **Socket.IO**.

![whiteboard_image_1](https://github.com/user-attachments/assets/a2c6eed7-8337-46e5-aaf2-6409e32a56cf)
![whiteboard_image_2](https://github.com/user-attachments/assets/0014b8c9-8f6c-4c32-8749-e4f682d7adb3)

## Features

- **Create and Join Rooms:** Users can create a room or join an existing room to collaborate with others in real-time.
- **Drawing Tools:** Users can:
  - Draw circles, rectangles, and freehand shapes.
  - Set border color and fill color for the shapes.
  - Clear the entire canvas.
  - Use an eraser to remove specific parts of the drawing.
  
## Technologies Used

- **React**: Frontend framework for building user interfaces.
- **Express**: Backend server to manage rooms and user connections.
- **Konva**: Canvas library to handle drawing shapes.
- **Socket.IO**: WebSocket library for real-time communication.

## How It Works

1. **Create or Join a Room**: Users can create a new room or join an existing room by entering the room ID.
2. **Real-time Collaboration**: Any user in the same room can draw shapes, free draw, erase, or clear the canvas, and these updates will be reflected for everyone in the room in real time.
3. **Customize Drawings**: Change border color, fill color, and erase elements with the eraser tool.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/collaborative-whiteboard.git
