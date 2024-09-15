import React from "react";
import { useTypeRacerContext } from "../contexts/TypeRacerContext"

function TimerAndRestart() {
    const { isTyping, timer, setTimer, gameRestart } = useTypeRacerContext()

    return (
        <>
            <div className="timer flex items-center justify-center gap-4 w-full">
                {!isTyping && (
                    <span
                        className="text-gray-500 cursor-pointer"
                        onClick={() =>
                            setTimer((prevtimer) => (prevtimer > 0 ? prevtimer - 15 : prevtimer))
                        }
                    >
                        <i className="ri-subtract-line"></i>
                    </span>
                )}
                <div className="text-gray-500">

                    {timer}
                </div>

                {!isTyping && (
                    <span
                        className="text-gray-500 cursor-pointer"
                        onClick={() => setTimer((prevtimer) => prevtimer + 15)}
                    >
                        <i className="ri-add-line"></i>
                    </span>
                )}
            </div>

            <div className="restart flex items-center justify-center w-full">
                <div className="rounded-full cursor-pointer" onClick={gameRestart}>
                    <i className="ri-refresh-line text-gray-500"></i>
                </div>
            </div>
        </>
    );
}

export default TimerAndRestart;
