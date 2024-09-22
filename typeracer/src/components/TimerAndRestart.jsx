import React, { useEffect } from "react";
import { useTypeRacerContext } from "../contexts/TypeRacerContext"

function TimerAndRestart() {
    const { gameStarted, setGameStarted, gameOver, setGameOver, timer, setTimer, gameRestart, InputValueArray, wordsArray, formatTime, gameStartState, setGameStartState } = useTypeRacerContext()

    // Handle timer countdown
    useEffect(() => {
        if (timer > 0 && gameStarted) {
            const interval = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);

            return () => clearInterval(interval);
        } else if (timer === 0) {
            setGameOver(true);
            setGameStarted(false)
        }
    }, [timer, gameOver, setTimer, setGameOver]);

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
            <div className="timer flex items-center justify-center gap-4 w-full">
                {gameStartState && (
                    <span
                        className="transition-all ease-out duration-500 hover:text-white text-gray-500 cursor-pointer"
                        onClick={() =>
                            setTimer((prevtimer) => (prevtimer > 0 ? prevtimer - 15 : prevtimer))
                        }
                    >
                        <i className="ri-subtract-line"></i>
                    </span>
                )}
                <div className="text-gray-500 transition-all ease-out duration-500">
                    {formatTime(timer)}
                </div>

                {gameStartState && (
                    <span
                        className="transition-all ease-out duration-500 hover:text-white text-gray-500 cursor-pointer"
                        onClick={() => setTimer((prevtimer) => prevtimer + 15)}
                    >
                        <i className="ri-add-line"></i>
                    </span>
                )}
            </div>

            <div className="restart flex items-center justify-center w-full">
                <div className={`rounded-full cursor-pointer transition-all ease-out duration-500 hover:rotate-[180deg] hover:text-white text-gray-500
                ${gameOver ? "text-white" : "text-gray-500"}
                `} onClick={gameRestart}>
                    <i className="ri-refresh-line "></i>
                </div>
            </div>
        </>
    );
}

export default TimerAndRestart;
