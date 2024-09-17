import React from 'react'

function Room({ roomInputRef, setRoom }) {
    return (
        <div className='h-full flex items-center justify-center flex-col'>
            <input
                type="text"
                placeholder="Enter room name..."
                className="input input-bordered w-full max-w-xs my-3"
                ref={roomInputRef}
            />
            <button
                className='btn max-w-md text-white bg-blue-600 hover:bg-blue-700'
                onClick={() => setRoom(roomInputRef.current.value)}
            >
                Enter Chat
            </button>
        </div>
    )
}
export default Room