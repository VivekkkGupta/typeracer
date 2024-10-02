import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTypeRacerContext } from "../contexts/TypeRacerContext";
import { useThemeContext } from "../contexts/ThemeContext";

function Navbar() {

    const { expandInVariant, gameModeWordsOrSentences, setGameModeWordsOrSentences, gameTextSize, setGameTextSize, flashInVariant, isSettingsOpen, setIsSettingsOpen } = useTypeRacerContext();

    const { theme, setTheme } = useThemeContext();


    const [isInfoOpen, setInfoOpen] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [openSettingIndex, setOpenSettingIndex] = useState(null);

    const toggleSettings = () => {
        setIsSettingsOpen(prev => !prev);
        if (!isSettingsOpen) setInfoOpen(false);
    };

    const toggleInfo = () => {
        setInfoOpen(prev => !prev);
        if (!isInfoOpen) setIsSettingsOpen(false);
    };

    const handleShareClick = () => {
        navigator.clipboard.writeText(window.location.href)
            .then(() => {
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
            })
            .catch(err => console.error('Failed to copy: ', err));
    };

    const handleClickOnSettings = index => {
        setOpenSettingIndex(prevIndex => (prevIndex === index ? null : index));
    };

    return (
        <>
            <div className="absolute top-5 right-2 p-5 flex flex-col gap-2 text-3xl rounded-xl z-[999999]">


                <div className={`${isSettingsOpen ? "opacity-100 top-5 z-[99999]" : "opacity-0 top-0 z-[-9]"} absolute text-xl bg-gray-200 dark:bg-slate-900 rounded-lg left-[-350%] text-black dark:text-white flex flex-col transition-all duration-500`}>


                    {['Theme', 'Word Mode', 'Language', 'Text Size'].map((item, index) => (

                        <div key={index} className="w-[15vw] cursor-pointer">

                            <div className="flex justify-between hover:bg-blue-300 dark:hover:bg-blue-900 py-4 px-6 rounded-lg" onClick={() => handleClickOnSettings(index)}>

                                {item}

                                <i className={`ri-arrow-left-s-line transition-transform duration-500 ${openSettingIndex === index ? 'rotate-[-90deg]' : ''}`}>

                                </i>

                            </div>

                            <AnimatePresence>
                                {openSettingIndex === index && (
                                    <motion.div className="text-base bg-gray-100 dark:bg-slate-800 rounded-lg overflow-hidden"
                                        variants={expandInVariant}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                    >
                                        {index === 0 && (
                                            <>
                                                <motion.div className="hover:bg-blue-400 dark:hover:bg-blue-900 hover:rounded-lg px-8 py-2 flex justify-between" onClick={() => setTheme('dark')}>Dark Mode

                                                    <AnimatePresence>
                                                        {
                                                            theme === 'dark' &&
                                                            <motion.div
                                                                variants={flashInVariant}
                                                                initial="hidden"
                                                                animate="visible"
                                                                exit="exit"
                                                            >

                                                                <i class="ri-check-line"></i>
                                                            </motion.div>
                                                        }
                                                    </AnimatePresence>
                                                </motion.div>
                                                <motion.div className="hover:bg-blue-400 dark:hover:bg-blue-900 hover:rounded-lg px-8 py-2 flex justify-between" onClick={() => setTheme('light')}>Light Mode
                                                    <AnimatePresence>
                                                        {
                                                            theme === 'light' &&
                                                            <motion.div
                                                                variants={flashInVariant}
                                                                initial="hidden"
                                                                animate="visible"
                                                                exit="exit"
                                                            >

                                                                <i class="ri-check-line"></i>
                                                            </motion.div>
                                                        }
                                                    </AnimatePresence>
                                                </motion.div>
                                            </>
                                        )}
                                        {index === 1 && (
                                            <>
                                                <motion.div className="hover:bg-blue-400 dark:hover:bg-blue-900 hover:rounded-lg px-8 py-2 flex justify-between"
                                                    onClick={() => setGameModeWordsOrSentences('words')}
                                                >Words

                                                    <AnimatePresence>
                                                        {
                                                            gameModeWordsOrSentences === 'words' &&
                                                            <motion.div
                                                                variants={flashInVariant}
                                                                initial="hidden"
                                                                animate="visible"
                                                                exit="exit"
                                                            >

                                                                <i class="ri-check-line"></i>
                                                            </motion.div>
                                                        }
                                                    </AnimatePresence>

                                                </motion.div>
                                                <motion.div className="hover:bg-blue-400 dark:hover:bg-blue-900 hover:rounded-lg px-8 py-2 flex justify-between"
                                                    onClick={() => setGameModeWordsOrSentences('sentences')}
                                                >Sentences

                                                    <AnimatePresence>
                                                        {
                                                            gameModeWordsOrSentences === 'sentences' &&
                                                            <motion.div
                                                                variants={flashInVariant}
                                                                initial="hidden"
                                                                animate="visible"
                                                                exit="exit"
                                                            >

                                                                <i class="ri-check-line"></i>
                                                            </motion.div>
                                                        }
                                                    </AnimatePresence>
                                                </motion.div>
                                            </>
                                        )}
                                        {
                                            index === 2 &&
                                            <motion.div className="hover:bg-blue-400 dark:hover:bg-blue-900 hover:rounded-lg px-8 py-2 flex justify-between"
                                            >
                                                English
                                                <AnimatePresence>
                                                    {
                                                        <motion.div
                                                            variants={flashInVariant}
                                                            initial="hidden"
                                                            animate="visible"
                                                            exit="exit"
                                                        >

                                                            <i class="ri-check-line"></i>
                                                        </motion.div>
                                                    }
                                                </AnimatePresence>
                                            </motion.div>
                                        }
                                        {index === 3 && (
                                            <>
                                                <motion.div className="hover:bg-blue-400 dark:hover:bg-blue-900 hover:rounded-lg px-8 py-2 flex justify-between"
                                                    onClick={() => setGameTextSize('small')}
                                                >
                                                    Small
                                                    <AnimatePresence>
                                                        {gameTextSize === "small" &&
                                                            <motion.div
                                                                variants={flashInVariant}
                                                                initial="hidden"
                                                                animate="visible"
                                                                exit="exit"
                                                            >

                                                                <i class="ri-check-line"></i>
                                                            </motion.div>
                                                        }
                                                    </AnimatePresence>
                                                </motion.div>
                                                <motion.div className="hover:bg-blue-400 dark:hover:bg-blue-900 hover:rounded-lg px-8 py-2 flex justify-between"
                                                    onClick={() => setGameTextSize('medium')}
                                                >
                                                    Medium
                                                    <AnimatePresence>
                                                        {gameTextSize === "medium" &&
                                                            <motion.div
                                                                variants={flashInVariant}
                                                                initial="hidden"
                                                                animate="visible"
                                                                exit="exit"
                                                            >

                                                                <i class="ri-check-line"></i>
                                                            </motion.div>
                                                        }
                                                    </AnimatePresence>
                                                </motion.div>
                                                <motion.div className="hover:bg-blue-400 dark:hover:bg-blue-900 hover:rounded-lg px-8 py-2 flex justify-between"
                                                    onClick={() => setGameTextSize('large')}
                                                >
                                                    Large
                                                    <AnimatePresence>
                                                        {gameTextSize === "large" &&
                                                            <motion.div
                                                                variants={flashInVariant}
                                                                initial="hidden"
                                                                animate="visible"
                                                                exit="exit"
                                                            >

                                                                <i class="ri-check-line"></i>
                                                            </motion.div>
                                                        }
                                                    </AnimatePresence>
                                                </motion.div>
                                            </>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div >
                <div className={`${isInfoOpen ? "opacity-100 top-5" : "opacity-0 top-0"} z-[9999] absolute text-lg bg-gray-200 dark:bg-slate-900 rounded-lg left-[-350%] text-black dark:text-white flex flex-col transition-all duration-500`}>
                    <div className='hover:bg-blue-300 dark:hover:bg-blue-900 hover:rounded-lg p-4 w-[15vw] cursor-pointer flex justify-between transition-all duration-500'>
                        This is a Modern Typing test Website to improve your typing skills.
                        <br />
                        <br />
                        Made with ❤️ by Vivek
                    </div>
                </div>

                <div onClick={toggleSettings} className={`${isSettingsOpen ? "rotate-[-90deg]" : "rotate-0"} duration-500 transition-all`}>
                    <i className="ri-settings-2-line cursor-pointer"></i>
                </div>

                <div onClick={handleShareClick}>
                    <i className="ri-share-line cursor-pointer"></i>
                </div>

                {
                    isCopied && (
                        <div className="absolute top-[40%] right-[80%] bg-gray-200 dark:bg-gray-800 text-black dark:text-white p-2 rounded-lg shadow-lg text-sm ">
                            Copied!
                        </div>
                    )
                }
                <div onClick={toggleInfo}>
                    <i className="ri-information-line cursor-pointer"></i>
                </div>
            </div >
        </>
    );
}

export default Navbar;
