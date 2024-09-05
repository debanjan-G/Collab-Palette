import React from 'react'
import { Description, Field, Input, Label } from '@headlessui/react'

const CreateRoomForm = () => {
    return (
        <div className="w-full max-w-md p-10 shadow-lg bg-slate-50 outline outline-slate-200">
            <h1 className='text-4xl font-bold text-center'>Create Room</h1>
            <Field className='my-4'>
                {/* <Label className="text-sm/6 font-medium text-black">Name</Label> */}
                <Input
                    placeholder='Name'
                    className=
                    ' outline outline-1 outline-slate-500 outline-offset-1 mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-black focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-blue-500' autoComplete='off'
                />
            </Field>

            <div className='flex justify-center w-full '>
                <div className='bg-slate-200 p-2 w-full'>
                    <p>321nj41-57824o-321bgje</p>
                </div>
                <button className='text-sm bg-slate-950 p-2 text-white hover:bg-slate-700 transition duration-200'>Generate</button>
                <button className='text-sm text-white p-2 bg-blue-500  hover:bg-blue-700 transition duration-200'>Copy</button>
            </div>


            <button className='bg-blue-700 hover:bg-blue-500 transition duration-200 text-white px-4 py-2 rounded-md my-4 w-full mx-auto'>Create Room</button>
        </div>
    )
}

export default CreateRoomForm
