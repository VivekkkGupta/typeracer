import React, { useEffect } from 'react'
import { useTypeRacerContext } from '../contexts/TypeRacerContext';

function Scoreboard() {

    const {
        calculateWPM, calculateCharacterAccuracy, calculateWordAccuracy, wrongWordsCount, wrongCharactersCount, elapsedTime,
        gameStartState, gameOver, setElapsedTime
    } = useTypeRacerContext();

    const scoreObj = {
        "Incorrect Words": wrongWordsCount,
        "Incorrect Characters":wrongCharactersCount,
        "Word accuracy":`${calculateWordAccuracy()}%`,
        "Character accuracy":`${calculateCharacterAccuracy()}%`,
        "Time elapsed":elapsedTime
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
        <div className={`bg-slate-900 rounded-lg  p-4 text-xl flex gap-4 text-gray-500 flex flex-col ${gameOver ? "w-[90%] md:w-[50%] lg:w-[30%]":""}`}>

            <div className="flex flex-col items-center justify-center w-full text-bold text-white relative px-10">
                <span className="text-5xl">
                    {calculateWPM()}
                </span> 
                <span className="">
                    WPM
                </span>
                
            </div>
            {
                gameOver && (
                    <div className='flex'>
                        <table className='w-full'>
                            <thead className=''>
                                <tr className='align-center'>
                                    <th className="text-white text-4xl" colSpan="2">Game Over</th>
                                </tr>
                            </thead>
                            <tbody className='w-full'>
                                <tr>
                                    <td colSpan="2" className='h-4'></td>
                                </tr>
                                {
                                    Object.keys(scoreObj).map((key) => (
                                        <tr key={key} className='text-white text-sm w-full'>
                                            <td className='text-right w-[50%]'>{key}</td>
                                            <td className='w-[50%]  pl-5'>{scoreObj[key]}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                            {/* <tr>
                                <td>Incorrect Words</td>
                                <td>{wrongWordsCount}</td>
                            </tr>
                            <tr>
                                <td>Incorrect Characters</td>
                                <td>{wrongCharactersCount}</td>
                            </tr>
                            <tr>
                                <td>Word accuracy</td>
                                <td>{calculateWordAccuracy()}%</td>
                            </tr>
                            <tr>
                                <td>Character accuracy</td>
                                <td>{calculateCharacterAccuracy()}%</td>
                            </tr>
                            <tr>
                                <td>Time elapsed</td>
                                <td>{elapsedTime}</td>
                            </tr> */}
                        </table>
                    
                    
                        {/* <div className="text-right">   
                            <div>Character accuracy</div>
                            <div>Word accuracy</div>
                            <div>Incorrect Words</div>
                            <div>Incorrect Characters</div>
                            <div>Time elapsed</div>
                        </div>
                        <div className="align-left">
                            <div>{calculateCharacterAccuracy()}%</div>
                            <div>{calculateWordAccuracy()}%</div>
                            <div>{wrongWordsCount}</div>
                            <div>{wrongCharactersCount}</div>
                            <div>{elapsedTime}</div>
                        </div> */}
                    </div>
                )
            }
            

        </div>
    )
}

export default Scoreboard