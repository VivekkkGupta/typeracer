import React, { useEffect, useRef, useState } from 'react'
import { useTypeRacerContext } from "../contexts/TypeRacerContext"

function Inputandchallenge() {
    const { wordsArray, inputbox, inputValue, setInputValue, eachcharacterref, wordRefs,
        textMeasureRef,
        ChallengeRef,
        challengeWidth,
        currentWordOffset,
        InputValueArray,
        shiftChallengeView,
        CheckCharacterCorrectOrNot,
        CheckWordIsCorrectOrNot,
        handleInput,
        gameStartState, gameOver } = useTypeRacerContext()



    return (
        <div className='relative flex flex-col justify-center gap-2'>
            <div className='absolute inset-0'>
                <div className='absolute inset-0 bg-gradient-to-r from-black via-transparent to-black pointer-events-none z-30'>
                </div>
            </div>

            <div className=" gap-2 h-full z-20">

                <div className="challenge text-left whitespace-nowrap w-full h-[8vh] relative">
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
                </div>

                <div className="flex justify-end relative">
                    <input
                        ref={inputbox}
                        onChange={(e) => handleInput(e)}
                        type="text"
                        placeholder={`${gameStartState ? "Type Here" : gameOver ? "Game Over" : ""}`}
                        value={inputValue}
                        className={`w-full
                        h-full placeholder:text-gray-500 bg-black focus:outline-0 outline-0
                        before:content-["hello"] before:absolute
                        pl-[50%]
                        `}
                    />
                    <span ref={textMeasureRef}
                        className="absolute invisible"
                        style={{ font: 'inherit' }}>
                        {inputValue}
                    </span>
                </div>

            </div>
        </div>
    )
}

export default Inputandchallenge