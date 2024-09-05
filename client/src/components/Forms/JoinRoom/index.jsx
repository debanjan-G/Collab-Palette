import React from 'react'
import { Description, Field, Input, Label } from '@headlessui/react'

const JoinRoomForm = () => {
    return (
        <div className="w-full h-1/2 min-h-fit max-w-md p-8 shadow-lg bg-slate-50 outline outline-slate-200">
            <h1 className='text-4xl font-bold text-center'>Join Room</h1>
            <form action="">
                <Field className='my-4'>
                    {/* <Label className="text-sm/6 font-medium text-black">Name</Label> */}
                    <Input
                        placeholder='Name'
                        className=
                        'outline outline-1 outline-slate-500 outline-offset-1 mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-black focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-blue-500' autoComplete='off'
                    />
                </Field>
                <Field className='my-4'>
                    {/* <Label className="text-sm/6 font-medium text-black">Room ID</Label> */}
                    <Input
                        placeholder='Room ID'
                        className=
                        ' outline outline-1 outline-slate-500 outline-offset-1 mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-black focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-blue-500' autoComplete='off'
                    />
                </Field>




                <button className='bg-blue-700 hover:bg-blue-500 transition duration-200 text-white px-4 py-2 rounded-md my-4 w-full mx-auto'>Join Room</button>
            </form>
        </div>
    )
}

export default JoinRoomForm
