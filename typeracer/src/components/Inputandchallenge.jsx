import { motion } from "framer-motion"
import { useTypeRacerContext } from "../contexts/TypeRacerContext"

function Inputandchallenge() {
    const { wordsArray, inputbox, inputValue, eachcharacterref, wordRefs,
        textMeasureRef,
        ChallengeRef,
        handleInput,
        gameStartState, gameOver,
        slideInVariant } = useTypeRacerContext()



    return (
        <div className='relative flex flex-col h-full justify-center'>
            <div className='absolute inset-0'>
                <div className='absolute inset-0 bg-gradient-to-r from-gray-300 dark:from-black via-transparent to-gray-300 dark:to-black pointer-events-none z-30'>
                </div>
            </div>

            <motion.div className="h-full z-20 flex flex-col justify-center gap-2">

                <motion.div className="challenge text-left whitespace-nowrap w-full h-[8vh] relative"
                    variants={slideInVariant}
                    initial='hidden'
                    animate='visible'
                    exit='exit'
                >
                    <div
                        ref={ChallengeRef}
                        className={`absolute text-gray-500 left-[50%] transition-all ease-out duration-[0.5s]
                            `}>

                        {wordsArray.map((word, wordindex) => (
                            <>
                                <span key={`word-${wordindex}`} ref={el => wordRefs.current[wordindex] = el}>
                                    {
                                        word.split("").map((char, charindex) => (
                                            <span ref={eachcharacterref} key={`char-${wordindex}-${charindex}`}>
                                                {char}
                                            </span>
                                        ))
                                    }
                                    <span key={`space-${wordindex}`}> </span>
                                </span>
                            </>
                        ))}
                    </div>
                </motion.div>

                <motion.div className="flex justify-end relative"
                    variants={slideInVariant}
                    initial='hidden'
                    animate='visible'
                    exit='exit'>
                    <input
                        ref={inputbox}
                        onChange={(e) => handleInput(e)}
                        type="text"
                        placeholder={`${gameStartState ? "Type Here" : gameOver ? "Game Over" : ""}`}
                        value={inputValue}
                        className={`w-full
                        h-full placeholder:text-gray-500 dark:placeholder:text-gray-400 bg-gray-300 dark:bg-black focus:outline-0 outline-0
                        pl-[50%]
                        `}
                    />
                    <span ref={textMeasureRef}
                        className="absolute invisible"
                        style={{ font: 'inherit' }}>
                        {inputValue}
                    </span>
                </motion.div>

            </motion.div>
        </div>
    )
}

export default Inputandchallenge