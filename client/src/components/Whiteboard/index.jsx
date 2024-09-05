import React from 'react'
import ControlUI from './Control UI'


const Whiteboard = () => {

    return (
        <div className=' bg-custom px-20'>
            <div className='h-[85vh] w-full mx-auto bg-slate-100 shadow-md p-4'>
                <div className='bg-white shadow-md w-full rounded-md p-2 mx-auto'>
                    <ControlUI />
                </div>
            </div>
        </div>
    )
}

export default Whiteboard
