import React from 'react'

function Navbar() {
    return (
        <div className="absolute top-5 right-2 p-5 flex flex-col gap-2 text-4xl rounded-xl">
            <div>
                <i className="ri-settings-2-line cursor-pointer"></i>
            </div>
            <div>
                <i className="ri-share-line cursor-pointer"></i>
            </div>
            <div>
                <i className="ri-information-line cursor-pointer"></i>
            </div>
        </div>
    )
}

export default Navbar