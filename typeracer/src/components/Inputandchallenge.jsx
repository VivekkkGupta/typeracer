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

    const [wrongWordsCount, setWrongWordsCount] = useState(0)
    const [wrongCharactersCount, setWrongCharactersCount] = useState(0)

    const [totalCharacterTyped, setTotalCharacterTyped] = useState(0)
    const [totalWordTyped, setTotalWordTyped] = useState(0)


    useEffect(() => {
        if (!gameStartState) {
            CheckCharacterCorrectOrNot()
        }
    }, [inputValue])

    useEffect(() => {
        if (InputValueArray.length !== wordsArray.length) {
            CheckWordIsCorrectOrNot();
        }
        setInputValue(""); // Reset input after checking the word
        shiftChallengeView();
    }, [InputValueArray])

    useEffect(() => {
        if (ChallengeRef.current) {
            ChallengeRef.current.style.left = `calc(50% - ${challengeWidth}px)`;
        }
    }, [challengeWidth]);

    useEffect(() => {
        if (inputbox.current) {
            inputbox.current.style.paddingLeft = `calc(50% - ${currentWordOffset}px)`;
        }
    }, [currentWordOffset])


    return (
        <div className='relative bg-black'>
            <div className='absolute inset-0 bg-gradient-to-r from-black via-transparent to-black pointer-events-none z-10'>
            </div>
            <div className="flex flex-col gap-5 z-20">

                <div className="challenge text-left whitespace-nowrap w-full h-[8vh] relative">
                    <div
                        ref={ChallengeRef}
                        className={`absolute text-gray-500 left-[50%] transition-all ease-out
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