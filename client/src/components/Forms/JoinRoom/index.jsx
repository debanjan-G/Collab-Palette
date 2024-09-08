/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Description, Field, Input, Label } from '@headlessui/react'
import { v4 as uuidv4 } from "uuid"
import { useNavigate } from 'react-router-dom'

const JoinRoomForm = ({ socket, setUserData }) => {

    const [name, setName] = useState("")
    const [roomID, setRoomID] = useState("")
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            name,
            roomID,
            userID: uuidv4(),
            host: false,
            presenter: true,
        }

        setUserData(data)
        console.log(data);

        socket.emit("userJoin");
        navigate(`/${roomID}/whiteboard`)

    }

    return (
        <div className="w-1/3 h-96 min-h-fit max-w-md p-4 shadow-lg bg-slate-50 outline outline-slate-200 flex flex-col justify-center">
            <h1 className='text-4xl font-bold text-center'>Join Room</h1>
            <form onSubmit={handleSubmit} className='px-4'>
                <Field className='my-4'>
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Name'
                        className=
                        'outline outline-1 outline-slate-500 outline-offset-1 mt-3 block w-full rounded-sm border-none bg-white/5 py-1.5 px-3 text-sm/6 text-black focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-blue-500' autoComplete='off'
                    />
                </Field>
                <Field className='my-4'>
                    <Input
                        value={roomID}
                        onChange={(e) => setRoomID(e.target.value)}
                        placeholder='Room ID'
                        className=
                        ' outline outline-1 outline-slate-500 outline-offset-1 mt-3 block w-full rounded-sm border-none bg-white/5 py-1.5 px-3 text-sm/6 text-black focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-blue-500' autoComplete='off'
                    />
                </Field>

                <button className='bg-blue-700 hover:bg-blue-500 transition duration-200 text-white px-4 py-2 rounded-md my-4 w-full mx-auto'>Join Room</button>
            </form>
        </div>
    )
}

export default JoinRoomForm
