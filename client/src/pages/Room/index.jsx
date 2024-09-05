import Whiteboard from '../../components/Whiteboard'
import { useParams } from 'react-router-dom'

const RoomPage = () => {
  const { roomID } = useParams();
  return (
    <div>
      <h1 className='text-center text-xl font-medium'>Room ID: {roomID}</h1>
      <Whiteboard />
    </div>
  )
}

export default RoomPage
