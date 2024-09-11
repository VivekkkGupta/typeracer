import React, { useEffect, useRef, useState } from 'react'
import { useTypeRacerContext } from "../contexts/TypeRacerContext"

function Inputandchallenge() {
    const { wordsArray, inputbox, inputValue, setInputValue, eachcharacterref } = useTypeRacerContext()

    const [wrongWordsCount, setWrongWordsCount] = useState(0)
    const [wrongCharactersCount, setWrongCharactersCount] = useState(0)

    const wordRef = useRef(null)

    const [InputValueArray, setInputValueArray] = useState([])
    const [InputValueString, setInputValueString] = useState("")

    const handleInput = (e) => {
        //saving string in a variable
        let inputString = e.target.value

        // if space is found then consider as word is completed or ignore it if it is first character
        if (inputString.endsWith(" ") || inputString === " ") {

            //if last character is space this means word is completed and should be saved in array
            if (inputString.length>1) {
                setInputValueArray((prevArray) => [
                    ...prevArray,
                    inputValue.trim()
                ]);
            }
            inputString = ""
            setInputValue("")
        }
        else{
            // For Showing on Inputbox
            setInputValue(inputString)
        }
    }

    useEffect(()=>{
        //get the currect character of the words from word array
        let CurrentCharacterOfWordsArray = wordsArray[InputValueArray.length][inputValue.length-1]
        //get the currect character of the input word
        let CurrentTypedCharacter = inputValue.slice(-1)
        
        if (CurrentCharacterOfWordsArray !== undefined){

            if (CurrentCharacterOfWordsArray === CurrentTypedCharacter){
                console.log("Correctly typed",CurrentCharacterOfWordsArray,CurrentTypedCharacter)
                console.log(inputbox.current.style.color="white")
            }
            else{
                console.log(inputbox.current.style.color="red")
                console.log("InCorrectly typed",CurrentCharacterOfWordsArray,CurrentTypedCharacter)
            }
        }
        else{
            let WordfromWordsArray = wordsArray[InputValueArray.length-1]
            let WordfromInputArray = InputValueArray[InputValueArray.length-1]
            
            if (WordfromWordsArray === WordfromInputArray){
                console.log("Word Typed Correctly")

            }
            else{
                console.log("Word Typed InCorrectly")
                
            }
        }

    },[inputValue])


    return (
        <>
            <div className="flex flex-col gap-5 ">

                <div className="challenge text-left whitespace-nowrap w-full h-[8vh] relative">
                    <div className={`absolute
                        left-[50%]    
                        `}>

                        {wordsArray.map((word, wordindex) => (
                            <span key={wordindex} ref={wordRef}>
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