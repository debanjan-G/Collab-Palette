/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useEffect, useRef, useState } from 'react';
import { Layer, Rect, Circle, Stage, Text, Line } from 'react-konva';
import { ACTIONS } from '../../constants';
import { useLocation } from 'react-router-dom';


const Whiteboard = ({ tool, setTool, stageRef, action, circles, setCircles, rectangles, setRectangles, lines, setLines, uuid, currentShapeID, isPainting, strokeColor, fillColor }) => {

    const location = useLocation();
    const socket = location.state;
    console.log("SOCKET = ", socket);


    const shapeRefs = useRef({})
    const [forceUpdate, setForceUpdate] = useState(0)

    useEffect(() => {

        const canvasImage = stageRef.current.toDataURL();
        socket.emit("whiteboardData", canvasImage)

    }, [])

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

            case ACTIONS.PENCIL:
                setLines([...lines,
                {
                    id,
                    tool,
                    strokeColor,
                    points: [x, y]
                }]);
                break;

            default:
                break;
        }
    }
    const handlePointerMove = () => {
        if (!isPainting.current) return;

        const stage = stageRef.current;
        const { x, y } = stage.getPointerPosition()
        const lastLine = lines[lines.length - 1];

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

            case ACTIONS.PENCIL:

                // add point
                lastLine.points = lastLine.points.concat([x, y]);
                // replace last
                lines.splice(lines.length - 1, 1, lastLine);
                setLines(lines.concat());
                break;

            default:
                break;
        }
    }
    const handlePointerUp = () => {
        isPainting.current = false;
    }

    const handleShapeClick = (id) => {
        // Get the ref of the shape and move it to the top
        if (shapeRefs.current[id]) {
            shapeRefs.current[id].moveToTop();
            shapeRefs.current[id].getLayer().batchDraw(); // Redraw the layer to apply changes
        }
        setForceUpdate((prev) => prev + 1); // Force a re-render
    };


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
                        ref={(node) => { shapeRefs.current[rectangle.id] = node; }} // Assign ref
                        key={rectangle.id}
                        height={rectangle.height}
                        width={rectangle.width}
                        x={rectangle.x}
                        y={rectangle.y}
                        fill={rectangle.fillColor}
                        stroke={rectangle.strokeColor}
                        onClick={() => handleShapeClick(rectangle.id)}
                    />
                )}

                {circles.map((circle) =>
                    <Circle
                        ref={(node) => { shapeRefs.current[circle.id] = node; }} // Assign ref
                        key={circle.id}
                        x={circle.x}
                        y={circle.y}
                        radius={circle.radius}
                        fill={circle.fillColor}
                        stroke={circle.strokeColor}
                        onClick={() => handleShapeClick(circle.id)}
                    />
                )}

                {lines.map((line) =>
                    <Line
                        key={line.id}
                        stroke={line.strokeColor}
                        points={line.points}
                        strokeWidth={line.tool === 'eraser' ? 20 : 5}
                        lineCap="round"
                        lineJoin="round"
                        globalCompositeOperation={
                            line.tool === 'eraser' ? 'destination-out' : 'source-over'
                        }

                    />
                )}

            </Layer>
        </Stage>

    );
};

export default Whiteboard;