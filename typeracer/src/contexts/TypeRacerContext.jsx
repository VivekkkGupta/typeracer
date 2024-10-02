import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import { generate } from "random-words";

const TypeRacerContext = createContext();

export const TypeRacerContextProvider = ({ children }) => {
    //array for challenge
    const [wordsArray, setWordsArray] = useState(generate(100));

    //Navbar States
    const [gameModeWordsOrSentences, setGameModeWordsOrSentences] = useState('words');
    const [gameTextSize, setGameTextSize] = useState('large');

    //Timer for game
    const [timer, setTimer] = useState(5);
    const [gameOver, setGameOver] = useState(true);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameStartState, setGameStartState] = useState(true);

    // For Stats
    const [wrongWordsCount, setWrongWordsCount] = useState(0);
    const [wrongCharactersCount, setWrongCharactersCount] = useState(0);
    const [correctCharactersCount, setCorrectCharactersCount] = useState(0);
    const [correctWordsCount, setCorrectWordsCount] = useState(0);
    const [totalCharacterTyped, setTotalCharacterTyped] = useState(0);
    const [totalWordTyped, setTotalWordTyped] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0); // To track time elapsed

    //ref for inputbox 
    const inputbox = useRef(null);
    const eachcharacterref = useRef(null);
    const wordRefs = useRef([])
    const textMeasureRef = useRef(null)
    const ChallengeRef = useRef(null)

    // widths for sliding challenge
    const [challengeWidth, setChallengeWidth] = useState(0)
    const [currentWordOffset, setCurrentWordOffset] = useState(0)

    // for Saving input
    const [inputValue, setInputValue] = useState('')
    // Input words array
    const [InputValueArray, setInputValueArray] = useState([])


    const gameRestart = () => {

        setTimer(60);
        setWrongWordsCount(0);
        setWrongCharactersCount(0);
        setCorrectCharactersCount(0);
        setCorrectWordsCount(0);
        setTotalCharacterTyped(0);
        setTotalWordTyped(0);
        setElapsedTime(0);

        setChallengeWidth(0)
        setCurrentWordOffset(0)
        setInputValueArray([])

        setGameStartState(true);
        setGameOver(false)
        setGameStarted(false)

        setWordsArray(generate(100))
        // Reset the color of all the word elements to text-gray-400
        wordRefs.current.forEach((wordElement, index) => {
            if (wordElement) {
                wordElement.style.transition = "none"; // Avoid transition effects on restart
                wordElement.style.color = "gray"; // Change to gray-400
            }
        });

        // Focus on the input box after restart
        if (inputbox.current) {
            inputbox.current.focus();
        }

    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };

    // Calculate WPM (Words Per Minute)
    const calculateWPM = () => {
        if (elapsedTime > 0) {
            const minutes = elapsedTime / 60;
            const totalCharactersTyped = correctCharactersCount;
            return Math.floor(totalCharactersTyped / (5 * minutes));
        }
        return 0;
    };

    // Calculate Character Accuracy
    const calculateCharacterAccuracy = () => {
        if (totalCharacterTyped > 0) {
            return ((correctCharactersCount / totalCharacterTyped) * 100).toFixed(2)
        }
        return 0
    };

    // Calculate Word Accuracy
    const calculateWordAccuracy = () => {
        if (totalWordTyped > 0) {
            // console.log(correctWordsCount, " / ", totalWordTyped, " = ", (correctWordsCount / totalWordTyped))
            return ((correctWordsCount / totalWordTyped) * 100).toFixed(2)
        }
        return 0
    };


    const CheckWordIsCorrectOrNot = () => {
        const CurrentWordfromWordsArray = wordsArray[InputValueArray.length - 1]
        const CurrentWordfromInputArray = InputValueArray[InputValueArray.length - 1]
        const currentIndex = InputValueArray.length - 1;

        ChangeColorToWhite(wordRefs, currentIndex + 1)

        if (wordRefs.current[currentIndex] !== undefined) {
            ChangeColorToWhite(wordRefs, currentIndex)

            if (CurrentWordfromWordsArray === CurrentWordfromInputArray) {
                wordRefs.current[currentIndex].style.color = `#6b7280`
                setCorrectWordsCount(prev => prev + 1);
            }
            else {
                ChangeColorToRed(wordRefs, currentIndex)
                setWrongWordsCount(prev => prev + 1);
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
                setWrongCharactersCount(prev => prev + 1);
                isCorrect = false;
                break;
            }
        }

        setTotalCharacterTyped(prev => prev + 1);

        // Change the color on basis of isCorrect
        if (isCorrect) {
            ChangeColorToWhite(inputbox);
            setCorrectCharactersCount(prev => prev + 1);

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
            EleRef.current[index].style.transition = "all 0.7s ease-out";
            EleRef.current[index].style.color = "red";
        } else {
            EleRef.current.style.transition = "all 0.7s ease-out";
            EleRef.current.style.color = "red";
        }
    };

    const ChangeColorToWhite = (EleRef, index = "") => {
        if (index !== "") {
            // For a specific element in the ref array
            EleRef.current[index].style.transition = "all 0.7s ease-out"; // Add transition
            EleRef.current[index].classList.add("text-black"); // Add text-white class
            EleRef.current[index].classList.add("dark:text-white"); // Add text-white class
        } else {
            // For the main element
            EleRef.current.style.transition = "all 0.7s ease-out"; // Add transition
            EleRef.current.classList.add("text-black"); // Add text-white class
            EleRef.current.classList.add("dark:text-white"); // Add text-white class
        }
    };

    // Move the challenge view to keep the current word in the center
    const shiftChallengeView = () => {
        if (ChallengeRef.current && wordRefs.current[InputValueArray.length - 1]) {
            const wordWidth = wordRefs.current[InputValueArray.length - 1].offsetWidth;
            setChallengeWidth((prev) => prev + wordWidth);
        }
    };

    const handleInput = (e) => {
        //saving string in a variable
        if (gameStartState || gameStarted) {

            let inputString = e.target.value

            //start the game
            if (!gameStarted) {
                setGameStarted(true);
                setGameOver(false)
                setGameStartState(false)
            }

            if (inputString.endsWith(" ")) {

                if (inputString === " ") {
                    // space at start
                    inputString = ""
                }

                if (inputString.length > 1) {
                    // space at end
                    setInputValue(inputString.trim(" "))

                    // Word is completed count the word
                    setTotalWordTyped(prev => prev + 1);

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
    }

    // Animation variants

    const slideInVariant = {
        hidden: { opacity: 0, y: 100 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
        exit: { opacity: 0, y: 100, transition: { duration: 0.7 } }
    };

    const flashInVariant = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } },
        exit: { opacity: 0, transition: { duration: 0.5 } }
    };

    const expandInVariant = {
        hidden: { height: 0, opacity: 0 },
        visible: { height: 'auto', opacity: 1, transition: { duration: 0.5 } },
        exit: { height: 0, opacity: 0, transition: { duration: 0.5 } }
    };

    const rotateVariant = {
        hidden: { opacity: 1 },
        rotate180: { rotate: '180deg', transition: { duration: 0.7 } }
    }



    //Usestates of Inputandchallenge
    useEffect(() => {
        if (!gameStartState && !gameOver) {
            CheckCharacterCorrectOrNot()
        }
    }, [inputValue])



    useEffect(() => {
        let inputElement = inputbox.current;
        inputElement.focus();
    }, [inputbox]);



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



    const values = {
        wordsArray, setWordsArray,
        timer,
        setTimer,
        formatTime,
        gameOver, setGameOver,
        gameStarted, setGameStarted,
        gameStartState, setGameStartState,
        inputbox,
        gameRestart,
        inputValue,
        setInputValue,
        eachcharacterref,
        wordRefs,
        textMeasureRef,
        ChallengeRef,
        challengeWidth,
        setChallengeWidth,
        currentWordOffset,
        setCurrentWordOffset,
        InputValueArray,
        setInputValueArray,
        shiftChallengeView,
        ChangeColorToWhite,
        ChangeColorToRed,
        CheckCharacterCorrectOrNot,
        CheckWordIsCorrectOrNot,
        handleInput,
        calculateWPM, calculateCharacterAccuracy, calculateWordAccuracy, correctWordsCount, wrongWordsCount, wrongCharactersCount, elapsedTime, setElapsedTime,
        slideInVariant, rotateVariant, flashInVariant, expandInVariant,
        gameModeWordsOrSentences, setGameModeWordsOrSentences, gameTextSize, setGameTextSize,
    };

    return (
        <TypeRacerContext.Provider value={values}>
            {children}
        </TypeRacerContext.Provider>
    );
};

export const useTypeRacerContext = () => useContext(TypeRacerContext);
