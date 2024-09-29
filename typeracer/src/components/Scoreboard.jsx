import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { useTypeRacerContext } from '../contexts/TypeRacerContext';
import ScoreBoardBoxes from './ScoreBoardBoxes';

function Scoreboard() {

    const {
        calculateWPM, calculateCharacterAccuracy, calculateWordAccuracy, wrongWordsCount, wrongCharactersCount, elapsedTime,
        gameStartState, gameOver, setElapsedTime, correctWordsCount, gameRestart
    } = useTypeRacerContext();

    const scoreObj = {
        "WPM": { value: calculateWPM(), color: "text-green-400" },
        "Correct Words": { value: correctWordsCount, color: "text-blue-400" },
        "Incorrect Words": { value: wrongWordsCount, color: "text-red-400" },
        "Incorrect Letters": { value: wrongCharactersCount, color: "text-red-300" },
        "Word Accuracy": { value: `${calculateWordAccuracy()}%`, color: "text-purple-400" },
        "Letter Accuracy": { value: `${calculateCharacterAccuracy()}%`, color: "text-yellow-600" },
        // "Time elapsed": { value: elapsedTime, color: "text-purple-400" },
    }

    // for time elapsed
    useEffect(() => {
        if (!gameStartState && !gameOver) {
            const interval = setInterval(() => {
                setElapsedTime(prev => prev + 1);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [gameStartState, gameOver]);


    return (

        <>
            <div className='h-full w-[70vw] mx-auto flex gap-4 flex-wrap justify-center items-center'>

                {
                    Object.keys(scoreObj).map((key) => (
                        <ScoreBoardBoxes
                            key={key}
                            scoreheading={key}
                            scorevalue={scoreObj[key].value}
                            color={scoreObj[key].color}
                        />
                    ))
                }
                <div className={`bg-slate-900 rounded-lg h-[20vh] p-2  text-white flex items-center justify-center flex-col basis-[15vw] cursor-pointer hover:bg-blue-900 transition-all duration-300`} onClick={gameRestart}>
                    <div className="text-2xl "><i class="ri-restart-line"></i> Restart!</div>
                </div>
            </div>

        </>
    )
}

export default Scoreboard