import React, { useEffect } from 'react'
import { useTypeRacerContext } from '../contexts/TypeRacerContext';

function Scoreboard() {

    const {
        calculateWPM, calculateCharacterAccuracy, calculateWordAccuracy, wrongWordsCount, wrongCharactersCount, elapsedTime,
        gameStartState, gameOver, setElapsedTime
    } = useTypeRacerContext();


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
        <div className="bg-slate-900 rounded-lg w-[90%] md:w-[50%] lg:w-[30%] p-4 text-xl flex gap-4 text-gray-500">
            <div className="text-right">
                <div>{calculateWPM()}</div>
                <div>Character accuracy</div>
                <div>Word accuracy</div>
                <div>Incorrect Words</div>
                <div>Incorrect Characters</div>
                <div>Time elapsed</div>
            </div>
            <div className="align-left">
                <div>WPM</div>
                <div>{calculateCharacterAccuracy()}%</div>
                <div>{calculateWordAccuracy()}%</div>
                <div>{wrongWordsCount}</div>
                <div>{wrongCharactersCount}</div>
                <div>{elapsedTime}</div>
            </div>
        </div>
    )
}

export default Scoreboard