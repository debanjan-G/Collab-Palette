import CreateRoomForm from './CreateRoom'
import JoinRoomForm from './JoinRoom'

const Forms = () => {
    return (
        <div className="h-[85vh] flex justify-evenly items-center">

            <CreateRoomForm />
            <JoinRoomForm />

        </div>
    )
}

export default Forms
