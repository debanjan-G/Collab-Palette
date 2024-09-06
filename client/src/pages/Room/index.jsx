import { useRef, useState } from 'react';
import Whiteboard from '../../components/Whiteboard'
import { useParams } from 'react-router-dom'
import ControlUI from '../../components/Whiteboard/Control UI';
import { ACTIONS } from '../../constants';

const RoomPage = () => {
  const { roomID } = useParams();

  const canvasRef = useRef();
  const [action, setAction] = useState(ACTIONS.pencil)
  const [color, setColor] = useState("#000000")


  return (
    <div className='flex flex-col justify-center p-10  bg-custom px-20' >
      <p className='text-green-600 text-center text-4xl font-medium my-4'> Active Users - 0</p>
      <div className='bg-slate-100 shadow-md w-full rounded-md p-2 mx-auto mb-5'>
        <ControlUI setAction={setAction} action={action} setColor={setColor} />
      </div>

      <Whiteboard
        action={action}

        canvasRef={canvasRef} />

    </div>
  )
}

export default RoomPage
