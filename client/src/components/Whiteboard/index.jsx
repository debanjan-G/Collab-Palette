/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useRef } from 'react';
import { Layer, Rect, Stage } from 'react-konva';
import { ACTIONS } from '../../constants';


const Whiteboard = ({ color, stageRef, action, rectangles, setRectangles, uuid, currentShapeID, isPainting, strokeColor, fillColor }) => {

    // console.log("CURRENT ACTION = ", action);
    console.log("CURRENT Color = ", color);
    console.log("CURRENT Stroke Color = ", strokeColor);
    console.log("CURRENT Fill Color = ", fillColor);

    const handlePointerDown = () => {

        // if (!isPainting.current) return;

        const stage = stageRef.current;
        const { x, y } = stage.getPointerPosition()
        const id = uuid();
        currentShapeID.current = id;
        isPainting.current = true;

        switch (action) {
            case ACTIONS.RECTANGLE:
                setRectangles((rectangles) => [
                    ...rectangles,
                    {
                        id,
                        x,
                        y,
                        height: 20,
                        width: 20,
                        fillColor,
                        strokeColor
                    },
                ]);
                break;

            default:
                break;
        }
    }
    const handlePointerMove = () => {
        if (!isPainting.current) return;

        const stage = stageRef.current;
        const { x, y } = stage.getPointerPosition()

        switch (action) {
            case ACTIONS.RECTANGLE:
                setRectangles((rectangles) =>
                    rectangles.map((rectangle) => {
                        if (rectangle.id === currentShapeID.current) {
                            return {
                                ...rectangle,
                                width: x - rectangle.x,
                                height: y - rectangle.y,
                            };
                        }
                        return rectangle;
                    })
                );
                break;

            default:
                break;
        }
    }
    const handlePointerUp = () => {
        isPainting.current = false;
    }



    return (
        // Canvas
        <Stage
            ref={stageRef}
            width={800}
            height={800}
            className=' mx-auto bg-white shadow-md p-4 border border-slate-400 rounded-md'
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
        >
            <Layer>

                {rectangles.map((rectangle) =>
                    <Rect
                        key={rectangle.id}
                        height={rectangle.height}
                        width={rectangle.width}
                        x={rectangle.x}
                        y={rectangle.y}
                        fill={rectangle.fillColor}
                        stroke={rectangle.strokeColor}
                    />
                )}

            </Layer>
        </Stage>

    );
};

export default Whiteboard;