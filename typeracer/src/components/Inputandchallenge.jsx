import React, { useEffect, useRef, useState } from 'react'
import { useTypeRacerContext } from "../contexts/TypeRacerContext"

function Inputandchallenge() {
    const { wordsArray, inputbox, inputValue, setInputValue, eachcharacterref } = useTypeRacerContext()

    const [wrongWordsCount, setWrongWordsCount] = useState(0)
    const [wrongCharactersCount, setWrongCharactersCount] = useState(0)
    
    const [totalCharacterTyped, setTotalCharacterTyped] = useState(0)
    const [totalWordTyped, setTotalWordTyped] = useState(0)

    const [challengeWidth, setChallengeWidth] = useState(0)
    const [inputWidth, setInputWidth] = useState(0)
    const [textWidth, setTextWidth] = useState(0)

    const wordRefs = useRef([])
    const textMeasureRef = useRef(null)
    const ChallengeRef = useRef(null)

    const [InputValueArray, setInputValueArray] = useState([])

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

            //Reset the input Box
            inputString = ""
            setInputValue("")

            //Change the input cursor to white
            ChangeColorToWhite(inputbox)
            setInputWidth(0)
        }
        else{
            // For Showing on Inputbox
            setInputValue(inputString)
            
        }
    }

    const CheckWordIsCorrectOrNot=()=> {
        let CurrentWordfromWordsArray = wordsArray[InputValueArray.length-1]
        let CurrentWordfromInputArray = InputValueArray[InputValueArray.length-1]
        const currentIndex = InputValueArray.length - 1;

        if (wordRefs.current[currentIndex] !== undefined){

            if (CurrentWordfromWordsArray === CurrentWordfromInputArray){
                ChangeColorToWhite(wordRefs,currentIndex)
            }
            else{
                ChangeColorToRed(wordRefs,currentIndex)
            }
        }
    }

    const CheckCharacterCorrectOrNot = () =>{

        //get the currect character of the words from word array
        let currentWord = wordsArray[InputValueArray.length];
        let isCorrect = true;
        
        // Check each character up to the current input length
        for (let i = 0; i < inputValue.length; i++) {
            let currentCharacterOfWordsArray = currentWord ? currentWord[i] : undefined;
            let currentTypedCharacter = inputValue[i];

            // If any character does not match, set isCorrect to false
            if (currentCharacterOfWordsArray !== currentTypedCharacter) {
                isCorrect = false;
                break;
            }
        }

        // Change the color on basis of isCorrect
        if (isCorrect) {
            ChangeColorToWhite(inputbox);
            if (textMeasureRef.current) {
                const textWidth = textMeasureRef.current.offsetWidth;
                setTextWidth((prevWidth)=>Math.abs(prevWidth-textWidth))
            }    
        } else {
            ChangeColorToRed(inputbox);
        }
    }

    const IncreaseWrongCharacterCount = () =>{
        setWrongCharactersCount((prevCount)=> prevCount+1)
    }

    const IncreaseWrongWordCount = () =>{
        setWrongWordsCount((prevCount)=> prevCount+1)
    }

    const ChangeColorToRed = (EleRef,index="") =>{
        if (index !==""){
            EleRef.current[index].style.color="red"
        }
        else{
            EleRef.current.style.color="red"
        }
    }

    const ChangeColorToWhite = (EleRef,index="") =>{
        if (index !==""){
            EleRef.current[index].style.color="white"
        }
        else{
            EleRef.current.style.color="white"
        }
    }

    const increaseChallengeWidth = (size) =>{
        setChallengeWidth((prevSize)=> prevSize + (size-prevSize))
        console.log(challengeWidth," ChallengeWidth")
    }

    const increaseInputWidth = (size) =>{
        setInputWidth(size)
        console.log(inputWidth," InputWidth")
    }

    useEffect(()=>{
        CheckCharacterCorrectOrNot()
    },[inputValue])

    useEffect(()=>{
        // after Space is pressed the word will be submitted and checked
        CheckWordIsCorrectOrNot();
    },[InputValueArray])

    useEffect(()=>{
        setChallengeWidth((prevWidth)=> prevWidth + textWidth);
        setInputWidth(textWidth);
    },[textWidth])

    useEffect(()=>{
        if (ChallengeRef.current) {
            ChallengeRef.current.style.left = `calc(50% - ${challengeWidth}px)`;
        }
        if (inputbox.current) {
            inputbox.current.style.paddingLeft = `calc(50% - ${inputWidth}px)`;
        }
    },[inputWidth])

    return (
        <>
            <div className="flex flex-col gap-5 ">

                <div className="challenge text-left whitespace-nowrap w-full h-[8vh] relative">
                    <div 
                    ref={ChallengeRef}
                    className={`absolute 
                        `}>

                        {wordsArray.map((word, wordindex) => (
                            <span key={wordindex} ref={el => wordRefs.current[wordindex] = el}>
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

                <div className="flex justify-end relative">
                    <input
                        ref={inputbox}
                        onChange={(e) => handleInput(e)}
                        type="text"
                        placeholder="Type Here"
                        value={inputValue}
                        className={`w-full
                        h-full placeholder:text-gray-400 bg-black focus:outline-0 outline-0
                        before:content-["hello"] before:absolute 
                        `}
                    />
                <span ref={textMeasureRef}
                    className="absolute invisible"
                    style={{ font: 'inherit' }}> 
                    {inputValue}
                </span>
                </div>

            </div>
        </>
    )
}

export default Inputandchallenge