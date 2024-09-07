/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useRef } from 'react';
import { Layer, Rect, Circle, Stage } from 'react-konva';
import { ACTIONS } from '../../constants';


const Whiteboard = ({ stageRef, action, circles, setCircles, rectangles, setRectangles, uuid, currentShapeID, isPainting, strokeColor, fillColor }) => {

    console.log("SELECTED TOOL = ", action);
    console.log("CIRCLES = ", circles);
    console.log("RECTANGLES = ", rectangles);



    const handlePointerDown = () => {

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

            case ACTIONS.CIRCLE:
                setCircles((circles) => [
                    ...circles,
                    {
                        id,
                        x,
                        y,
                        radius: 10,
                        fillColor,
                        strokeColor
                    }
                ])
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

            case ACTIONS.CIRCLE:
                setCircles((circles) =>
                    circles.map((circle) => {
                        if (circle.id === currentShapeID.current) {
                            return {
                                ...circle,
                                radius: Math.sqrt((y - circle.y) ** 2 + (x - circle.x) ** 2)
                            };
                        }
                        return circle;
                    }))
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
            width={1200}
            height={400}
            className=' mx-auto bg-white shadow-md border border-slate-400 rounded-md'
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

                {circles.map((circle) =>
                    <Circle
                        key={circle.id}
                        x={circle.x}
                        y={circle.y}
                        radius={circle.radius}
                        fill={circle.fillColor}
                        stroke={circle.strokeColor}
                    />
                )}

            </Layer>
        </Stage>

    );
};

export default Whiteboard;