import React, { useEffect } from "react";
import { motion } from "framer-motion"
import { useTypeRacerContext } from "../contexts/TypeRacerContext"

function TimerAndRestart() {
    const { gameStarted, setGameStarted, gameOver, setGameOver, timer, setTimer, gameRestart, InputValueArray, wordsArray, formatTime, gameStartState, setGameStartState,
        rotateVariant, flashInVariant
    } = useTypeRacerContext()

    // Handle timer countdown
    useEffect(() => {
        if (timer > 0 && gameStarted && !gameOver) {
            const interval = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);

            return () => clearInterval(interval);
        } else if (timer === 0) {
            setGameOver(true);
            setGameStarted(false)
        }
    }, [timer, gameOver, gameStarted]);

    useEffect(() => {
        if (InputValueArray.length === wordsArray.length) {
            setGameOver(true);
            setGameStarted(false)
            setGameStartState(false)
        }
    }, [InputValueArray, wordsArray, setGameOver]);


    // useEffect(() => {
    //     console.log(`GameStart : ${gameStarted}, Gameover : ${gameOver}, GameStartState : ${gameStartState}`)
    // });

    return (
        <>
            <div className="w-full h-full flex flex-col justify-center gap-5">

                <div className="timer flex items-center justify-center gap-4 w-full">
                    {gameStartState && (
                        <motion.span
                            className="transition-all ease-out duration-500 hover:text-white text-gray-500 cursor-pointer"
                            onClick={() =>
                                setTimer((prevtimer) => (prevtimer > 0 ? prevtimer - 15 : prevtimer))
                            }
                            variants={flashInVariant}
                            initial='hidden'
                            animate='visible'
                            exit='exit'
                        >
                            <i className="ri-subtract-line"></i>
                        </motion.span>
                    )}
                    <div className="text-gray-500 transition-all ease-out duration-500">
                        {formatTime(timer)}
                    </div>

                    {gameStartState && (
                        <motion.span
                            className="transition-all ease-out duration-500 hover:text-white text-gray-500 cursor-pointer"
                            onClick={() => setTimer((prevtimer) => prevtimer + 15)}
                            variants={flashInVariant}
                            initial='hidden'
                            animate='visible'
                            exit='exit'
                        >
                            <i className="ri-add-line"></i>
                        </motion.span>
                    )}
                </div>

                <motion.div className="restart flex items-center justify-center w-full">
                    <motion.div className={`rounded-full cursor-pointer transition-all ease-out duration-500 hover:rotate-[180deg] hover:text-white text-gray-500
                    ${gameOver ? "text-white rotate-[180deg]" : "text-gray-500"}
                    `}
                        onClick={gameRestart}
                        variants={rotateVariant}
                    // initial=' hidden'
                    // animate='rotate180'
                    >
                        <i className="ri-refresh-line "></i>
                    </motion.div>
                </motion.div>
            </div >
        </>
    );
}

export default TimerAndRestart;
