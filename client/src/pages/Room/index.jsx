import { useRef, useState } from 'react';
import Whiteboard from '../../components/Whiteboard'
import { useParams } from 'react-router-dom'
import ControlUI from '../../components/Whiteboard/Control UI';
import { ACTIONS } from '../../constants';
import { v4 as uuidv4 } from "uuid"

const RoomPage = () => {
  const { roomID } = useParams();
  const stageRef = useRef();

  const isPainting = useRef();
  const currentShapeID = useRef()


  const [action, setAction] = useState(ACTIONS.PENCIL)
  const [color, setColor] = useState("#000000")
  const [strokeColor, setStrokeColor] = useState("#000000")
  const [fillColor, setFillColor] = useState("#FFFFFF")

  const [rectangles, setRectangles] = useState([])


  return (
    <div className='flex flex-col justify-center p-10  bg-custom px-20' >
      <p className='text-green-600 text-center text-4xl font-medium my-4'> Active Users - 0</p>
      <div className='bg-slate-100 shadow-md w-full rounded-md p-2 mx-auto mb-5'>
        <ControlUI setAction={setAction} action={action} strokeColor={strokeColor} setStrokeColor={setStrokeColor} fillColor={fillColor} setFillColor={setFillColor} stageRef={stageRef} />
      </div>

      <Whiteboard
        action={action}
        stageRef={stageRef}
        setRectangles={setRectangles}
        rectangles={rectangles}
        uuid={uuidv4}
        currentShapeID={currentShapeID}
        isPainting={isPainting}
        color={color}
        strokeColor={strokeColor}
        fillColor={fillColor}
      />

    </div>
  )
}

export default RoomPage