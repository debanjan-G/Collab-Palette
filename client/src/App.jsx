import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from "react-router-dom";
import RoomPage from "./pages/Room/index"
import HomePage from "./pages/Home/index"
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

function App() {

  const [userData, setUserData] = useState("")
  const [socket, setSocket] = useState(null)


  const server = 'http://localhost:5000'
  const connectionOptions = {
    forceNew: true,
    reconnectionAttempts: Infinity,
    timeout: 10000,
    transports: ['websocket']
  }

  useEffect(() => {
    const socketInstance = io(server, connectionOptions);
    setSocket(socketInstance);

    socketInstance.on("userIsJoined", (data) => {
      if (data.success) {
        console.log("User joined successfully.");
      } else {
        console.log("User couldn't join the room!");
      }
    });

    // return () => {
    //   socketInstance.disconnect(); // Cleanup socket on component unmount
    // };
  }, []);

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' >

      <Route path=''
        element={
          <HomePage
            socket={socket}
            userData={userData} setUserData={setUserData}
          />} />

      <Route path=':roomID/whiteboard'
        element={
          <RoomPage
            socket={socket}
            userData={userData}
            setUserData={setUserData} />} />
    </Route>
  ))

  return (

    <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-custom p-10">
      <RouterProvider router={router}>
        <div className="blur-circle"></div>
        <div className="">
          <h1 className="text-5xl font-bold text-center">Collab_Palette</h1>
          <p className="text-center text-xl">A Real-Time Collaborative Whiteboard</p>
        </div>
      </RouterProvider>
    </div >

  );
}

export default App;
