/* eslint-disable react/prop-types */
import { Field, Label, Select } from '@headlessui/react'
import { BiExport } from "react-icons/bi";
import { GrClear } from "react-icons/gr";
import { FaCaretDown } from "react-icons/fa";
import clsx from 'clsx'
import { ACTIONS } from '../../../constants';

export default function ControlUI({ action, setAction, color, setColor, stageRef }) {

    const handleColorChange = (e) => {
        console.log("CHANGING COLOR TO ", e.target.value);
        setColor(e.target.value)
    }

    const handleToolChange = (e) => {
        console.log("CHANGING Tool TO ", e.target.value);
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

    return (
        <div className="flex items-center justify-between gap-4 w-full px-4">
            <Field className='w-1/6'>
                <div className="relative min-w-fit">
                    <Select
                        value={action}
                        onChange={handleToolChange}
                        className={clsx(
                            'mt-3 block w-full appearance-none rounded-lg border-none bg-white py-1.5 px-3 text-sm/6 text-black',
                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25 ',
                            // Make the text of each option black on Windows
                            '*:text-black'
                        )}
                    >
                        <option value={ACTIONS.PENCIL}>Pencil</option>
                        <option value={ACTIONS.LINE}>Line</option>
                        <option value={ACTIONS.RECTANGLE}>Rectangle</option>
                        <option value={ACTIONS.CIRCLE}>Circle</option>

                    </Select>
                    <FaCaretDown
                        className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-black/60"
                        aria-hidden="true"
                    />
                </div>
            </Field>

            <Field>
                <div>
                    <input value={color} onChange={handleColorChange} type="color" name="" id="" className='my-3'
                    />
                </div>
            </Field>



            <div className='p-4'>
                <GrClear className='size-10 inline hover:cursor-pointer text-red-500 mx-2' />
                <BiExport className='size-10 inline hover:cursor-pointer mx-4' onClick={handleExportImage} />

                {/* <button className='opacity-90 hover:opacity-100 mx-2 py-2 px-4 rounded-md bg-blue-600 text-white'>Undo</button>
                <button className='opacity-90 hover:opacity-100 mx-2 py-2 px-4 rounded-md bg-green-500 text-white'>Redo</button> */}

            </div>
        </div>
    )
}