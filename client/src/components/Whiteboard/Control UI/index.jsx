/* eslint-disable react/prop-types */
import { Field, Label, Select } from '@headlessui/react'
import { BiExport } from "react-icons/bi";
import { GrClear } from "react-icons/gr";
import { FaCaretDown } from "react-icons/fa";
import clsx from 'clsx'
import { ACTIONS } from '../../../constants';
import { IoColorFill } from "react-icons/io5";
import { MdBorderColor } from "react-icons/md";
import { IoIosDownload } from "react-icons/io";
import { CiEraser } from "react-icons/ci";

export default function ControlUI({ setShapes, action, setAction, strokeColor, setStrokeColor, fillColor, setFillColor, stageRef, setRectangles, setCircles, setLines, setTool }) {



    const handleFillColorChange = (e) => {
        setFillColor(e.target.value)
    }
    const handleStrokeColorChange = (e) => {
        setStrokeColor(e.target.value)
    }


    const handleToolChange = (e) => {
        if (e.target.value === 'pencil') {
            setTool('pencil')
        }
        setAction(e.target.value)
    }

    const handleExportImage = () => {
        const uri = stageRef.current.toDataURL();
        const link = document.createElement("a")
        link.download = "image.png"
        link.href = uri;
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    const handleClearCanvas = () => {
        console.log("CLEARING CANVAS...");

        setCircles([]);
        setRectangles([]);
        setLines([]);
        setShapes([]);

        const stage = stageRef.current;
        const layer = stage.getLayers()[0]; // Assuming the shapes are on the first layer

        // Remove all children (shapes) from the layer
        layer.destroyChildren();
        layer.draw(); // Redraw the layer to reflect the change
    };

    const setToolToEraser = () => {
        setTool("eraser")
    }

    return (
        <div className='bg-slate-100 shadow-md w-fit rounded-md p-2 mx-auto mb-5'>
            <div className="flex items-center justify-center w-full gap-4 ">
                <Field>
                    <div>
                        <MdBorderColor className='size-8 text-black mx-auto' />
                        <input value={strokeColor} onChange={handleStrokeColorChange} type="color" name="" id="" className='my-3 h-10'
                        />
                    </div>
                </Field>


                <Field>
                    <div>
                        <IoColorFill className='size-8 text-green-500 mx-auto' />
                        <input value={fillColor} onChange={handleFillColorChange} type="color" name="" id="" className='my-3 h-10'
                        />
                    </div>
                </Field>

                <Field className=''>
                    {/* <TbTools className='size-8 mx-auto' /> */}
                    <div className="relative min-w-fit">
                        <Select
                            value={action}
                            onChange={handleToolChange}
                            className={clsx(
                                'mt-3 block min-w-32 appearance-none rounded-lg border-none bg-white py-1.5 px-3 text-sm/6 text-black',
                                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25 ',
                                // Make the text of each option black on Windows
                                '*:text-black'
                            )}
                        >
                            <option value={ACTIONS.PENCIL}>Pencil</option>
                            <option value={ACTIONS.RECTANGLE}>Rectangle</option>
                            <option value={ACTIONS.CIRCLE}>Circle</option>

                        </Select>
                        <FaCaretDown
                            className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-black/60"
                            aria-hidden="true"
                        />
                    </div>
                </Field>

                <div className='p-4'>
                    <CiEraser onClick={setToolToEraser} className='size-10 inline hover:cursor-pointer mx-2' />
                    <GrClear onClick={handleClearCanvas} className='size-10 inline hover:cursor-pointer text-red-500 mx-2' />
                    <IoIosDownload className='size-10 inline hover:cursor-pointer mx-4' onClick={handleExportImage} />




                </div>
            </div>
        </div >
    )
}