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

                // after Space is pressed the word will be submitted and checked
                CheckWordIsCorrectOrNot();
            }

            

            //Reset the input Box
            inputString = ""
            setInputValue("")

            //Change the input cursor to white
            ChangeColorToWhite(inputbox)
        }
        else{
            // For Showing on Inputbox
            setInputValue(inputString)
            
        }
    }

    const CheckWordIsCorrectOrNot=()=> {
        let CurrentWordfromWordsArray = wordsArray[InputValueArray.length-1]
        let CurrentWordfromInputArray = InputValueArray[InputValueArray.length-1]

        console.log(CurrentWordfromWordsArray)
        console.log(CurrentWordfromInputArray)
        
        // if (CurrentWordfromWordsArray === CurrentWordfromInputArray){
        //     console.log("Word Typed Correctly",CurrentWordfromWordsArray)
        // }
        // else{
        //     console.log("Word Typed InCorrectly",CurrentWordfromWordsArray,CurrentWordfromInputArray)
        // }
    }

    const CheckCharacterCorrectOrNot = () =>{

        //get the currect character of the words from word array
        let currentWord = wordsArray[InputValueArray.length];
        let CurrentCharacterOfWordsArray = currentWord ? currentWord[inputValue.length-1] : undefined;

        //get the currect character of the input word
        let CurrentTypedCharacter = inputValue.slice(-1)

        //Current character of wordarray should not be undefined
        console.log(CurrentCharacterOfWordsArray)
        console.log(CurrentTypedCharacter)
        // if (CurrentCharacterOfWordsArray !== undefined){

        //     //If both the characters are same then character entered is correct
        //     if (CurrentCharacterOfWordsArray === CurrentTypedCharacter){
        //         ChangeColorToWhite(inputbox)
        //         console.log("ifblock")
        //     }
        //     else{
        //         ChangeColorToRed(inputbox)
        //         console.log("elseblock")
        //     }
        // }

        // //If trying to access more character from word array 
        // else{
        //     ChangeColorToRed(inputbox)
        // }
    }

    const IncreaseWrongCharacterCount = () =>{
        setWrongCharactersCount((prevCount)=> prevCount+1)
    }

    const IncreaseWrongWordCount = () =>{
        setWrongWordsCount((prevCount)=> prevCount+1)
    }

    const ChangeColorToRed = (EleRef) =>{
        EleRef.current.style.color="red"
    }

    const ChangeColorToWhite = (EleRef) =>{
        EleRef.current.style.color="white"
    }

    useEffect(()=>{
        CheckCharacterCorrectOrNot()
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