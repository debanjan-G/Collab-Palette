import { Description, Field, Label, Select } from '@headlessui/react'
import { FaCaretDown } from "react-icons/fa";
import clsx from 'clsx'

export default function ControlUI() {
    return (
        <div className="flex justify-between gap-4 w-full px-4">
            <Field className='w-1/6'>
                <Label className="text-sm/6 font-medium text-black ">
                    Tools
                </Label>
                <div className="relative min-w-fit">
                    <Select
                        className={clsx(
                            'mt-3 block w-full appearance-none rounded-lg border-none bg-slate-100 py-1.5 px-3 text-sm/6 text-black',
                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25 ',
                            // Make the text of each option black on Windows
                            '*:text-black'
                        )}
                    >
                        <option value="active">
                            Pencil
                        </option>
                        <option value="paused">
                            Line

                        </option>
                        <option value="delayed">
                            Rectangle
                        </option>
                        {/* <option value="canceled">Canceled</option> */}
                    </Select>
                    <FaCaretDown
                        className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-black/60"
                        aria-hidden="true"
                    />
                </div>
            </Field>

            <Field>
                <Label className="text-sm/6 font-medium text-black ">
                    Color
                </Label>
                <div>
                    <input type="color" name="" id="" className='my-3'
                    />
                </div>
            </Field>

            <div className='p-4'>
                <button className='opacity-90 hover:opacity-100 mx-2 py-2 px-4 rounded-md bg-blue-600 text-white'>Undo</button>
                <button className='opacity-90 hover:opacity-100 mx-2 py-2 px-4 rounded-md bg-green-500 text-white'>Redo</button>
                <button className='mx-2 py-2 px-4 bg-gray-100 rounded-md outline outline-red-500 text-red-500 hover:bg-red-500 hover:text-white transition duration-200'>Clear</button>
            </div>
        </div>
    )
}
