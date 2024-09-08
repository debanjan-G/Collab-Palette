import { io } from 'socket.io-client'
import CreateRoomForm from './CreateRoom'
import JoinRoomForm from './JoinRoom'
import { useEffect, useState } from 'react'


const Forms = () => {

    const [userData, setUserData] = useState(null)

    const server = 'http://localhost:5000'
    const connectionOptions = {
        forceNew: true,
        reconnectionAttempts: Infinity,
        timeout: 10000,
        transports: ['websocket']
    }

    const socket = io(server, connectionOptions)

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
            {/* <h1>FORMS</h1> */}
            <CreateRoomForm socket={socket} setUserData={setUserData} />
            <JoinRoomForm socket={socket} setUserData={setUserData} />

        </div>
    )
}

export default Forms
