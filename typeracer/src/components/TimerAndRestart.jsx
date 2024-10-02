import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useTypeRacerContext } from "../contexts/TypeRacerContext";

function TimerAndRestart() {
    const {
        gameStarted,
        setGameStarted,
        gameOver,
        setGameOver,
        timer,
        setTimer,
        gameRestart,
        InputValueArray,
        wordsArray,
        formatTime,
        gameStartState,
        rotateVariant,
        flashInVariant
    } = useTypeRacerContext();

    // Handle timer countdown
    useEffect(() => {
        if (gameStarted && !gameOver) {
            if (timer > 0) {
                const interval = setInterval(() => {
                    setTimer(prevTimer => prevTimer - 1);
                }, 1000);
                return () => clearInterval(interval);
            }
            setGameOver(true);
            setGameStarted(false);
        }
    }, [timer, gameOver, gameStarted]);

    // Check for game over conditions
    useEffect(() => {
        if (InputValueArray.length === wordsArray.length) {
            setGameOver(true);
            setGameStarted(false);
        }
    }, [InputValueArray, wordsArray, setGameOver]);

    const decrementTimer = () => {
        setTimer(prevTimer => (prevTimer > 0 ? prevTimer - 15 : prevTimer));
    };

    const incrementTimer = () => {
        setTimer(prevTimer => prevTimer + 15);
    };

    return (
        <div className="w-full h-full flex flex-col justify-center gap-5">
            <div className="timer flex items-center justify-center gap-4 w-full">
                {gameStartState && (
                    <motion.span
                        className="transition-all ease-out duration-500 hover:text-gray-500 dark:hover:text-white text-black dark:text-gray-500 cursor-pointer"
                        onClick={decrementTimer}
                        variants={flashInVariant}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <i className="ri-subtract-line"></i>
                    </motion.span>
                )}
                <motion.div className="text-black dark:text-gray-500 transition-all ease-out duration-500"
                    variants={flashInVariant}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    {formatTime(timer)}
                </motion.div>

                {gameStartState && (
                    <motion.span
                        className="transition-all ease-out duration-500 hover:text-gray-500 dark:hover:text-white text-black dark:text-gray-500 cursor-pointer"
                        onClick={incrementTimer}
                        variants={flashInVariant}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <i className="ri-add-line"></i>
                    </motion.span>
                )}
            </div>

            <motion.div className="restart flex items-center justify-center w-full">
                <motion.div className={`rounded-full cursor-pointer hover:rotate-[180deg] hover:text-black dark:hover:text-white text-gray-500 
                ${gameOver ? "!text-black dark:!text-white" : "text-gray-500"}`}
                    onClick={gameRestart}
                    variants={rotateVariant}
                    initial="hidden"
                    animate={gameOver ? 'rotate180' : ""}
                >
                    <i className="ri-refresh-line "></i>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default TimerAndRestart;
