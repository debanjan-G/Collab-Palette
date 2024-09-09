/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import CreateRoomForm from './CreateRoom'
import JoinRoomForm from './JoinRoom'


const Forms = ({ socket, userData, setUserData }) => {

    return (
        <div className="h-[85vh] flex justify-evenly items-center">
            <CreateRoomForm socket={socket} setUserData={setUserData} />
            <JoinRoomForm socket={socket} setUserData={setUserData} />

        </div>
    )
}

export default Forms
