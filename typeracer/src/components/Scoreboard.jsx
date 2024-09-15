import React from 'react'

function Scoreboard() {
    return (
        <div className="bg-slate-900 rounded-lg w-[90%] md:w-[50%] lg:w-[30%] p-4 text-xl flex gap-4 text-gray-500">
            <div className="text-right">
                <div>0</div>
                <div>Character accuracy</div>
                <div>Word accuracy</div>
                <div>Incorrect Words</div>
                <div>Incorrect Characters</div>
                <div>Time elapsed</div>
            </div>
            <div className="align-left">
                <div>WPM</div>
                <div>0</div>
                <div>0</div>
                <div>0</div>
                <div>0</div>
                <div>60</div>
            </div>
        </div>
    )
}

export default Scoreboard