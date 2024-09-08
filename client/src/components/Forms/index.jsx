import { io } from 'socket.io-client'
import CreateRoomForm from './CreateRoom'
import JoinRoomForm from './JoinRoom'
import { useEffect, useState } from 'react'

const server = "http://localhost:5000";
const connectionOptions = {
    forceNew: true, // Correct key format for 'force new connection'
    reconnectionAttempts: Infinity, // Ensure this matches correctly with Socket.IO
    timeout: 10000, // 10 seconds
    transports: ["websocket"]
};


const socket = io(server, connectionOptions)

const Forms = () => {

    const [userData, setUserData] = useState(null)

    useEffect(() => {
        socket.on("userIsJoined", (data) => {
            if (data.success) {
                console.log("User joined successfully.");
            } else {
                console.log("User coudln't join the room!");
            }
        })
    }, []
    )

    return (
        <div className="h-[85vh] flex justify-evenly items-center">

            <CreateRoomForm socket={socket} setUserData={setUserData} />
            <JoinRoomForm socket={socket} />

        </div>
    )
}

export default Forms
