import Whiteboard from '../../components/Whiteboard'
import { useParams } from 'react-router-dom'

const RoomPage = () => {
  const { roomID } = useParams();
  return (
    <div className='flex flex-col justify-center p-10'>
      {/* <h1 className='outline p-2 rounded-lg w-fit'>Room ID: {roomID}</h1> */}
      <p className='text-green-600 text-center text-4xl font-medium my-4'> Active Users - 0</p>
      <Whiteboard />
    </div>
  )
}

export default RoomPage
