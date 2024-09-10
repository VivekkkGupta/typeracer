import React, { useEffect, useState } from 'react'
import { useTypeRacerContext } from "../contexts/TypeRacerContext"

function Inputandchallenge() {
    const { wordsArray, inputbox, inputValue, setInputValue, eachcharacterref } = useTypeRacerContext()

    const [wrongWordsCount, setWrongWordsCount] = useState(0)
    const [wrongCharactersCount, setWrongCharactersCount] = useState(0)

    const [InputValueArray, setInputValueArray] = useState([])

    const handleInput = (e) => {
        let InputValues = e.target.value

        setInputValueArray(InputValues.split(" "))
        // if (InputValues.split("")[InputValues.length - 1] === " ") {
        // }

        setInputValue(e.target.value)
    }

    const checkCorrectOrNot = () => {
        for (let i = 0; i < wordsArray.length; i++) {
            // console.log(wordsArray[i], i)
            // console.log(InputValueArray[i], i)
            if (InputValueArray.length >= 1) {

                for (let j = 0; j < wordsArray[i].length; j++) {

                    if (wordsArray[i][j] === InputValueArray[i].split("")[j]) {
                        console.log("right typed")
                    }
                    else {
                        console.log("wrong typed")
                    }
                }
                // if (wordsArray[i] === InputValueArray[i]) {
                //     console.log("first word correct")
                // }
                // else {
                //     console.log("first word wrong")
                // }
            }
        }
    }

    useEffect(() => {
        checkCorrectOrNot();
    }, [inputValue])
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
                                        <span ref={eachcharacterref} key={charindex}>
                                            {char}
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
                        onChange={(e) => handleInput(e)}
                        type="text"
                        placeholder="Type Here"
                        value={inputValue}
                        className={`w-full pl-[calc(50%)]
                        h-full placeholder:text-gray-400 bg-black focus:outline-0 outline-0`}
                    />

                </div>

            </div>
        </>
    )
}

export default Inputandchallenge