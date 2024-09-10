import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import { generate } from "random-words";

const TypeRacerContext = createContext();

export const TypeRacerContextProvider = ({ children }) => {
    const [wordsArray, setWordsArray] = useState(generate(100));
    const [timer, setTimer] = useState(60);
    const [isTyping, setIsTyping] = useState(false);
    const [testOver, setTestOver] = useState(false);
    const inputbox = useRef(null);
    const eachcharacterref = useRef(null);
    const [currChar, setCurrChar] = useState("")
    const [inputValue, setInputValue] = useState('')


    // useEffect(() => {
    //     console.log(inputbox.current.clientWidth)
    // }, [inputValue])

    const gameRestart = () => {
        setTestOver(false);
        setIsTyping(false);
        setTimer(60);
        inputbox.current.focus();
    };

    const calculateOffset = (htmlelement) => {
        return htmlelement.length
    }

    const values = {
        wordsArray,
        setWordsArray,
        timer,
        setTimer,
        isTyping,
        setIsTyping,
        testOver,
        setTestOver,
        inputbox,
        gameRestart,
        inputValue,
        setInputValue,
        eachcharacterref,
        calculateOffset
    };

    return (
        <TypeRacerContext.Provider value={values}>
            {children}
        </TypeRacerContext.Provider>
    );
};

export const useTypeRacerContext = () => useContext(TypeRacerContext);
