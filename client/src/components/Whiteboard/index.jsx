import React from 'react'
import ControlUI from './Control UI'


const Whiteboard = () => {

    return (
        <div className=' bg-custom px-20'>
            <div className='h-[80vh] w-full mx-auto bg-white shadow-md p-4 border border-slate-400 rounded-md'>
                <div className='bg-slate-100 shadow-md w-full rounded-md p-2 mx-auto'>
                    <ControlUI />
                </div>
            </div>
        </div>
    )
}

export default Whiteboard
