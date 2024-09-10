import React from 'react'
import { useTypeRacerContext } from "../contexts/TypeRacerContext"

function Inputandchallenge() {
    const { wordsArray, setIsTyping, inputbox, inputValue, setInputValue, eachcharacterref, calculateOffset } = useTypeRacerContext()
    return (
        <>
            <div className="flex flex-col gap-5 ">

                <div className="challenge text-left whitespace-nowrap w-full h-[8vh] relative">
                    <div className={`absolute
                        left-[50%]    
                        `}>

                        {wordsArray.map((word, wordindex) => (
                            <span key={wordindex}>
                                {
                                    word.split("").map((char, charindex) => (
                                        <span ref={eachcharacterref} key={charindex}>{char}

                                        </span>

                                    ))
                                }
                                
                                <span key={`space-${wordindex}`}> </span>
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end">
                    <input
                        ref={inputbox}
                        onChange={(e) => setInputValue(e.target.value)}
                        type="text"
                        placeholder="Type Here"
                        value={inputValue}
                        className={`w-full pl-[50%]
                            
                        h-full placeholder:text-gray-400 bg-black focus:outline-0 outline-0`}
                    />
                    
                </div>

            </div>
        </>
    )
}

export default Inputandchallenge