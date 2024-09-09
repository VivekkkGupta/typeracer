import React from 'react'

function Scoreboard() {
    return (
        <div className="bg-gray-700 rounded-lg w-[90%] md:w-[50%] lg:w-[30%] p-4 text-xl flex gap-4">
            <div className="text-right">
                <div>WPM</div>
                <div>Character accuracy</div>
                <div>Word accuracy</div>
                <div>Word list</div>
                <div>Word mode</div>
                <div>Incorrect words</div>
                <div>Time elapsed</div>
            </div>
            <div className="align-left">
                <div>0</div>
                <div>0</div>
                <div>0</div>
                <div>0</div>
                <div>0</div>
                <div>0</div>
                <div>Time elapsed</div>
            </div>
        </div>
    )
}

export default Scoreboard