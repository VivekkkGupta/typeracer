import React, { useState } from 'react'


function Navbar() {

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const handleClickOnSettings = (e, index) => {
        console.log(e.target)
    }

    return (

        <>


            <div className="absolute top-5 right-2 p-5 flex flex-col gap-2 text-3xl rounded-xl">
                <div className={`${isSettingsOpen ? "z-[50]" : "z-[-20]"} absolute text-xl bg-slate-900 rounded-lg left-[-350%] text-white  flex flex-col transition-all duration-500`}>

                    {
                        ["Theme", "Word Mode", "Language", "Text Size"].map((item, index) => (
                            <div key={index} className='hover:bg-slate-800 p-4 w-[15vw] cursor-pointer transition-all duration-500 flex justify-between'
                                onClick={(e, index) => handleClickOnSettings(e, index)}

                            >
                                {item}
                                <i class="ri-arrow-left-s-line"></i>
                            </div>
                        ))
                    }

                </div>
                <div onClick={() => setIsSettingsOpen((prevState) => !prevState)}>
                    <i className="ri-settings-2-line cursor-pointer"></i>
                </div>
                <div>
                    <i className="ri-share-line cursor-pointer"></i>
                </div>
                <div>
                    <i className="ri-information-line cursor-pointer"></i>
                </div>
            </div>
        </>
    )
}

export default Navbar