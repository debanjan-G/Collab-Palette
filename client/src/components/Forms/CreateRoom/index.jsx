import { Field, Input } from '@headlessui/react'

const CreateRoomForm = () => {
    return (
        <div className="w-full h-1/2 min-h-fit max-w-md p-8 shadow-lg bg-slate-50 outline outline-slate-200">
            <h1 className='text-4xl font-bold text-center'>Create Room</h1>
            <form>
                <Field className='my-4'>
                    <Input
                        placeholder='Name'
                        className=
                        ' outline outline-1 outline-slate-500 outline-offset-1 mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-black focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-blue-500' autoComplete='off'
                    />
                </Field>
                <div className='flex justify-center w-full '>
                    <Input
                        placeholder='Generate Room Code '
                        className=
                        'bg-slate-200 outline outline-1 outline-slate-500 outline-offset-1 mt-3 block w-full rounded-sm border-none bg-white/5 py-1.5 px-3 text-sm/6 text-black focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-blue-500' autoComplete='off' disabled
                    />
                    <button className=' bg-slate-950  text-white hover:bg-slate-700 transition duration-200 mt-3 block rounded-sm border-none bg-white/5 py-1.5 px-3 text-sm/6 '>Generate</button>

                    <button className='bg-blue-700  text-white hover:bg-blue-600 transition duration-200  mt-3 block rounded-sm border-none bg-white/5 py-1.5 px-3 text-sm/6 '>Copy</button>
                </div>
                <button className='bg-blue-700 hover:bg-blue-500 transition duration-200 text-white px-4 py-2 rounded-md my-4 w-full mx-auto'>Create Room</button>
            </form>
        </div>
    )
}

export default CreateRoomForm
