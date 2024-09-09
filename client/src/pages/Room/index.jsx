/* eslint-disable react/prop-types */
import { useRef, useState } from 'react';
import Whiteboard from '../../components/Whiteboard'
import { useParams } from 'react-router-dom'
import ControlUI from '../../components/Whiteboard/Control UI';
import { ACTIONS } from '../../constants';
import { v4 as uuidv4 } from "uuid"

const RoomPage = ({ userData, socket }) => {
  const { roomID } = useParams();
  const stageRef = useRef(null);

  const isPainting = useRef(false);
  const currentShapeID = useRef(null)


  const [action, setAction] = useState(ACTIONS.PENCIL)
  const [color, setColor] = useState("#000000")
  const [strokeColor, setStrokeColor] = useState("#000000")
  const [fillColor, setFillColor] = useState("#FFFFFF")

  // For Pencil/Eraser Functionality
  const [tool, setTool] = useState("pencil")


  // SHAPES
  const [rectangles, setRectangles] = useState([])
  const [circles, setCircles] = useState([])
  const [lines, setLines] = useState([])

  console.log("USER -> ", userData);


  return (
    <div className='flex flex-col justify-center p-10  bg-custom px-20' >
      <p className='text-green-600 text-center text-4xl font-medium my-4'>
        Active Users - 0</p>

      <ControlUI
        setAction={setAction}
        action={action}
        strokeColor={strokeColor}
        setStrokeColor={setStrokeColor}
        fillColor={fillColor}
        setFillColor={setFillColor}
        stageRef={stageRef}
        setRectangles={setRectangles}
        setCircles={setCircles}
        setLines={setLines}
        setTool={setTool}
      />

      <Whiteboard
        socket={socket}
        action={action}
        stageRef={stageRef}
        setCircles={setCircles}
        circles={circles}
        setRectangles={setRectangles}
        rectangles={rectangles}
        lines={lines}
        setLines={setLines}
        uuid={uuidv4}
        currentShapeID={currentShapeID}
        isPainting={isPainting}
        color={color}
        strokeColor={strokeColor}
        fillColor={fillColor}
        tool={tool}
      />

    </div>
  )
}

export default RoomPage