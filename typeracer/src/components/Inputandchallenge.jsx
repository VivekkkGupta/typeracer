import React, { useEffect, useRef, useState } from 'react'
import { useTypeRacerContext } from "../contexts/TypeRacerContext"

function Inputandchallenge() {
    const { wordsArray, inputbox, inputValue, setInputValue, eachcharacterref } = useTypeRacerContext()

    const [wrongWordsCount, setWrongWordsCount] = useState(0)
    const [wrongCharactersCount, setWrongCharactersCount] = useState(0)

    const [totalCharacterTyped, setTotalCharacterTyped] = useState(0)
    const [totalWordTyped, setTotalWordTyped] = useState(0)

    const [challengeWidth, setChallengeWidth] = useState(0)
    const [currentWordOffset, setCurrentWordOffset] = useState(0)

    const wordRefs = useRef([])
    const textMeasureRef = useRef(null)
    const ChallengeRef = useRef(null)

    const [InputValueArray, setInputValueArray] = useState([])

    const handleInput = (e) => {
        //saving string in a variable
        let inputString = e.target.value

        if (inputString.endsWith(" ")) {

            if (inputString === " ") {
                // space at start
                inputString = ""
            }

            if (inputString.length > 1) {
                // space at end
                setInputValue(inputString.trim(" "))
                console.log(inputValue)

                // Word is completed proceed for word inspection

                setInputValueArray((prevArray) => [
                    ...prevArray,
                    inputValue.trim(" ")
                ]);
                inputString = "";
            }
        }
        // For Showing on Inputbox
        setInputValue(inputString)
    }

    const CheckWordIsCorrectOrNot = () => {
        const CurrentWordfromWordsArray = wordsArray[InputValueArray.length - 1]
        const CurrentWordfromInputArray = InputValueArray[InputValueArray.length - 1]
        const currentIndex = InputValueArray.length - 1;

        ChangeColorToWhite(wordRefs, currentIndex + 1)


        if (wordRefs.current[currentIndex] !== undefined) {
            ChangeColorToWhite(wordRefs, currentIndex)

            if (CurrentWordfromWordsArray === CurrentWordfromInputArray) {
                wordRefs.current[currentIndex].style.color = `#6b7280`
            }
            else {
                ChangeColorToRed(wordRefs, currentIndex)
            }
        }
    }

    const CheckCharacterCorrectOrNot = () => {

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

            // Measure text width for dynamic adjustment when correct
            if (textMeasureRef.current) {
                const textwidth = textMeasureRef.current.offsetWidth;
                setCurrentWordOffset(textwidth);
            }
        } else {
            ChangeColorToRed(inputbox);
        }
    }

    const ChangeColorToRed = (EleRef, index = "") => {
        if (index !== "") {
            EleRef.current[index].style.transition = "all 0.4s ease-out";
            EleRef.current[index].style.color = "red";
        } else {
            EleRef.current.style.transition = "all 0.4s ease-out";
            EleRef.current.style.color = "red";
        }
    };

    const ChangeColorToWhite = (EleRef, index = "") => {
        if (index !== "") {
            EleRef.current[index].style.transition = "all 0.4s ease-out";
            EleRef.current[index].style.color = "white";
        } else {
            EleRef.current.style.transition = "all 0.4s ease-out";
            EleRef.current.style.color = "white";
        }
    };


    // Move the challenge view to keep the current word in the center
    const shiftChallengeView = () => {
        if (ChallengeRef.current && wordRefs.current[InputValueArray.length - 1]) {
            const wordWidth = wordRefs.current[InputValueArray.length - 1].offsetWidth;
            setChallengeWidth((prev) => prev + wordWidth);
            console.log(wordWidth, " : ", wordRefs.current[InputValueArray.length])
        }
    };

    useEffect(() => {
        CheckCharacterCorrectOrNot()
    }, [inputValue])


    useEffect(() => {
        // after Space is pressed the word will be submitted and checked
        CheckWordIsCorrectOrNot();
        setInputValue(""); // Reset input after checking the word
        shiftChallengeView();
    }, [InputValueArray])

    // Dynamically adjust the challenge position
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
        <>
            <div className="flex flex-col gap-5 ">

                <div className="challenge text-left whitespace-nowrap w-full h-[8vh] relative">
                    <div
                        ref={ChallengeRef}
                        className={`absolute text-gray-500 left-[50%] transition-all ease-out
                        `}>

                        {wordsArray.map((word, wordindex) => (
                            <>
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
                            </>
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
        </>
    )
}

export default Inputandchallenge