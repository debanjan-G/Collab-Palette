
import { useRef } from 'react';
import { Layer, Stage } from 'react-konva';


const Whiteboard = ({ action }) => {

    const stageRef = useRef();

    const handlePointerDown = () => {

    }
    const handlePointerMove = () => {

    }
    const handlePointerUp = () => {

    }



    return (
        // Canvas
        <Stage
            ref={stageRef}
            className='h-[65vh] w-[65vw] mx-auto bg-white shadow-md p-4 border border-slate-400 rounded-md'
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
        >
            <Layer></Layer>
        </Stage>

    );
};

export default Whiteboard;
