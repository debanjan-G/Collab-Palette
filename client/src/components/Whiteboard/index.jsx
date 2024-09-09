/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import { Layer, Rect, Circle, Stage, Line, Image } from 'react-konva';
import { ACTIONS } from '../../constants';

const Whiteboard = ({ shapes, setShapes, socket, tool, stageRef, action, uuid, isPainting, strokeColor, fillColor }) => {
    const [image, setImage] = useState(null);

    const shapeRefs = useRef({});

    useEffect(() => {
        console.log("INSIDE useEffect!");
        if (!socket) return;

        const handleWhiteboardDataResponse = (data) => {
            const img = new window.Image();
            img.src = data.updatedImage;
            img.onload = () => {
                setImage(img);
            };
        };

        socket.on("whiteboardDataResponse", handleWhiteboardDataResponse);

        return () => {
            socket.off("whiteboardDataResponse", handleWhiteboardDataResponse);
        };
    }, [socket]);

    const handlePointerDown = () => {
        const stage = stageRef.current;
        const { x, y } = stage.getPointerPosition();
        const id = uuid();
        const newShape = {
            id,
            type: action,
            x,
            y,
            strokeColor,
            fillColor,
            order: shapes.length + 1, // Add an order to keep track of draw order
        };

        switch (action) {
            case ACTIONS.RECTANGLE:
                newShape.width = 20;
                newShape.height = 20;
                break;
            case ACTIONS.CIRCLE:
                newShape.radius = 10;
                break;
            case ACTIONS.PENCIL:
                newShape.points = [x, y];
                break;
            default:
                break;
        }

        setShapes([...shapes, newShape]);
        isPainting.current = true;
    };

    const handlePointerMove = () => {
        if (!isPainting.current) return;
        const stage = stageRef.current;
        const { x, y } = stage.getPointerPosition();

        setShapes(shapes.map(shape => {
            if (shape.id === shapes[shapes.length - 1]?.id) {
                switch (shape.type) {
                    case ACTIONS.RECTANGLE:
                        return { ...shape, width: x - shape.x, height: y - shape.y };
                    case ACTIONS.CIRCLE:
                        return { ...shape, radius: Math.sqrt((y - shape.y) ** 2 + (x - shape.x) ** 2) };
                    case ACTIONS.PENCIL:
                        shape.points = shape.points.concat([x, y]);
                        return { ...shape };
                    default:
                        return shape;
                }
            }
            return shape;
        }));
    };

    const handlePointerUp = () => {
        isPainting.current = false;
        const stageImage = stageRef.current.toDataURL();
        socket.emit("whiteboardData", stageImage);
    };

    const handleShapeClick = (id) => {
        if (shapeRefs.current[id]) {
            shapeRefs.current[id].moveToTop();
            shapeRefs.current[id].getLayer().batchDraw();
        }
    };

    return (
        <Stage
            ref={stageRef}
            width={1200}
            height={400}
            className='mx-auto bg-white shadow-md border border-slate-400 rounded-md'
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
        >
            <Layer>
                {image && (
                    <Image
                        image={image}
                        x={0}
                        y={0}
                        width={1200}
                        height={400}
                    />
                )}

                {shapes.sort((a, b) => a.order - b.order).map(shape => {
                    switch (shape.type) {
                        case ACTIONS.RECTANGLE:
                            return (
                                <Rect
                                    ref={(node) => { shapeRefs.current[shape.id] = node; }}
                                    key={shape.id}
                                    x={shape.x}
                                    y={shape.y}
                                    width={shape.width}
                                    height={shape.height}
                                    fill={shape.fillColor}
                                    stroke={shape.strokeColor}
                                    onClick={() => handleShapeClick(shape.id)}
                                />
                            );
                        case ACTIONS.CIRCLE:
                            return (
                                <Circle
                                    ref={(node) => { shapeRefs.current[shape.id] = node; }}
                                    key={shape.id}
                                    x={shape.x}
                                    y={shape.y}
                                    radius={shape.radius}
                                    fill={shape.fillColor}
                                    stroke={shape.strokeColor}
                                    onClick={() => handleShapeClick(shape.id)}
                                />
                            );
                        case ACTIONS.PENCIL:
                            return (
                                <Line
                                    key={shape.id}
                                    stroke={shape.strokeColor}
                                    points={shape.points}
                                    strokeWidth={shape.tool === 'eraser' ? 20 : 5}
                                    lineCap="round"
                                    lineJoin="round"
                                    globalCompositeOperation={
                                        shape.tool === 'eraser' ? 'destination-out' : 'source-over'
                                    }
                                />
                            );
                        default:
                            return null;
                    }
                })}
            </Layer>
        </Stage>
    );
};

export default Whiteboard;
