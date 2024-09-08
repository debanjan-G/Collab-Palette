/* eslint-disable react/prop-types */
import { Field, Input } from '@headlessui/react'
import { useState } from 'react';
import { v4 as uuidv4 } from "uuid"
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CreateRoomForm = ({ socket, setUserData }) => {

    const [roomCode, setRoomCode] = useState("")
    const [name, setName] = useState("")
    const navigate = useNavigate()

    const handleGenerateRoomCode = () => {
        console.log("Generating Room Code...");
        setRoomCode(uuidv4())
        toast("Code generated ✅ ")
    }

    const handleCopyToClickboard = () => {
        if (roomCode === "") {
            return toast("⚠️ first generate a room code")
        }
        navigator.clipboard.writeText(roomCode)
        toast("copied to clipboard ✅ ")
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Creating Room...");

        const data = {
            name,
            roomID: roomCode,
            userID: uuidv4(),
            host: true,
            presenter: true
        }

        setUserData(data); //saving the data as state
        console.log(data);

        socket.emit("userJoined", data)

        navigate(`/${roomCode}/whiteboard`)
    }

    return (
        <div className="w-1/3 h-96 min-h-fit max-w-md p-4 shadow-lg bg-slate-50 outline outline-slate-200 flex flex-col justify-center">
            <Toaster />
            <h1 className='text-4xl font-bold text-center'>Create Room</h1>
            <form className='px-4' onSubmit={handleSubmit}>
                <Field className='my-4'>
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Name'
                        className=
                        'outline outline-1 outline-slate-500 outline-offset-1 mt-3 block w-full rounded-sm border-none bg-white/5 py-1.5 px-3 text-sm/6 text-black focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-blue-500'
                        autoComplete='off'
                        required
                    />
                </Field>
                <div className='flex justify-center w-full'>
                    <Input
                        value={roomCode}
                        placeholder='Generate Room Code '
                        className=
                        'outline outline-1 outline-slate-500 outline-offset-1 mt-3 block w-full rounded-sm border-none bg-white/5 py-1.5 px-3 text-sm/6 text-black focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-blue-500' autoComplete='off' disabled
                    />
                </div>
                <div className='flex'>
                    <button type='button' onClick={handleGenerateRoomCode} className='w-full  rounded-md bg-slate-900 hover:bg-slate-700 text-white transition duration-200 mt-3 block  border-none  py-1.5 px-3 text-sm/6 mx-1 '>Generate</button>

                    <button type='button' onClick={handleCopyToClickboard} className='bg-green-700 w-full  rounded-md hover:bg-green-500 text-white transition duration-200  mt-3 block border-none py-1.5 px-3 text-sm/6 mx-1 '>Copy</button>
                </div>
                <button className='bg-blue-700 hover:bg-blue-500 transition duration-200 text-white px-4 py-2 rounded-md my-4 w-full mx-auto'>Create Room</button>
            </form>
        </div>
    )
}

export default CreateRoomForm
