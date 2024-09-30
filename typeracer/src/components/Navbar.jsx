import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTypeRacerContext } from "../contexts/TypeRacerContext";

function Navbar() {

    const { flashInVariant, expandInVariant } = useTypeRacerContext();

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isInfoOpen, setInfoOpen] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [openSettingIndex, setOpenSettingIndex] = useState(null);

    // Handle the click on Settings: open Settings and close Info
    const toggleSettings = () => {
        setIsSettingsOpen((prevState) => !prevState);
        if (!isSettingsOpen) setInfoOpen(false); // Close Info if Settings is opened
    };

    // Handle the click on Info: open Info and close Settings
    const toggleInfo = () => {
        setInfoOpen((prevState) => !prevState);
        if (!isInfoOpen) setIsSettingsOpen(false); // Close Settings if Info is opened
    };

    const handleShareClick = () => {
        const url = window.location.href; // Get the current URL
        navigator.clipboard.writeText(url) // Copy URL to clipboard
            .then(() => {
                setIsCopied(true); // Show copied notification
                setTimeout(() => setIsCopied(false), 2000); // Hide notification after 2 seconds
            })
            .catch((err) => console.error('Failed to copy: ', err)); // Handle errors
    };

    const handleClickOnSettings = (index) => {
        // Toggle the sub-options for the clicked setting
        setOpenSettingIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    return (

        <>


            <div className="absolute top-5 right-2 p-5 flex flex-col gap-2 text-3xl rounded-xl">

                <div className={`${isSettingsOpen ? "opacity-100 top-5" : "opacity-0 top-0"} z-[99999] absolute text-xl bg-slate-900 rounded-lg left-[-350%] text-white  flex flex-col transition-all duration-500`}>

                    {['Theme', 'Word Mode', 'Language', 'Text Size'].map((item, index) => (
                        <div key={index} className="w-[15vw] cursor-pointer">
                            <div
                                className="flex justify-between hover:bg-blue-900 py-4 px-6 rounded-lg"
                                onClick={() => handleClickOnSettings(index)}
                            >
                                {item}
                                <i className={`ri-arrow-left-s-line transition-transform duration-500 ${openSettingIndex === index ? 'rotate-[-90deg]' : ''}`}
                                ></i>
                            </div>
                            <AnimatePresence>
                                {openSettingIndex === index && (
                                    <motion.div className="text-base bg-slate-800 rounded-lg overflow-hidden"
                                        variants={expandInVariant}
                                        initial='hidden'
                                        animate='visible'
                                        exit='exit'
                                    >
                                        <motion.div className="hover:bg-blue-900  hover:rounded-lg px-8 py-2">Option 1</motion.div>
                                        <motion.div className="hover:bg-blue-900  hover:rounded-lg px-8 py-2">Option 2</motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                        </div>
                    ))}
                </div>

                <div className={`${isInfoOpen ? "opacity-100 top-5" : "opacity-0 top-0"} z-[9999] absolute text-lg bg-slate-900 rounded-lg left-[-350%] text-white  flex flex-col transition-all duration-500 `}>

                    <div className='hover:bg-blue-900 hover:rounded-lg p-4 w-[15vw] cursor-pointer flex justify-between'
                    >
                        This is a Modern Typing test Website to improve your typing skills.
                        <br />
                        <br />
                        Made with ❤️ by Vivek
                    </div>

                </div>

                <div onClick={toggleSettings}
                    className={`${isSettingsOpen ? "rotate-[-90deg]" : "rotate-0"} duration-500 transition-all`}
                >
                    <i className="ri-settings-2-line cursor-pointer"></i>
                </div>

                <div onClick={handleShareClick}>
                    <i className="ri-share-line cursor-pointer"></i>
                </div>

                {isCopied && (
                    <div className="absolute top-[40%] right-[80%] bg-gray-800 text-white p-2 rounded-lg shadow-lg text-sm">
                        Copied!
                    </div>
                )}

                <div onClick={toggleInfo}>
                    <i className="ri-information-line cursor-pointer"></i>
                </div>
            </div >
        </>
    )
}

export default Navbar