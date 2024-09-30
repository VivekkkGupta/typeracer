function ScoreBoardBoxes({ scoreheading, scorevalue, color }) {
    return (
        <div className={`bg-slate-900 rounded-lg h-[20vh] w-[15vw] p-2 text-white flex items-center justify-center flex-col `}>
            <div className="text-xl text-center">{scoreheading}</div>
            <div className={`text-2xl font-[900] ${color}`}>{scorevalue}</div>
        </div>
    );
}

export default ScoreBoardBoxes;