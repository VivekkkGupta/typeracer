import { useEffect } from "react";
import Scoreboard from "./components/Scoreboard";
import Navbar from "./components/Navbar";
import TimerAndRestart from "./components/TimerAndRestart";
import Inputandchallenge from "./components/Inputandchallenge";
import { useTypeRacerContext } from "./contexts/TypeRacerContext";

const App = () => {
  const { inputbox, isTyping, setIsTyping, testOver, setTestOver, setTimer } = useTypeRacerContext();

  useEffect(() => {
    let inputElement = inputbox.current;
    inputElement.focus();
  }, [inputbox]);

  useEffect(() => {
    let interval;
    if (isTyping && !testOver) {
      interval = setInterval(() => {
        setTimer((prevtimer) => {
          if (prevtimer <= 1) {
            clearInterval(interval);
            setTestOver(true);
            setIsTyping(false);
            return 0;
          }
          return prevtimer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTyping, testOver, setTimer, setTestOver, setIsTyping]);

  return (
    <div className="bg-black w-full h-screen text-white relative flex flex-col justify-around text-5xl overflow-hidden">
      {/* <Navbar /> */}

      <div className="flex flex-col gap-5 h-[20vh] w-full">
        <TimerAndRestart />
      </div>


      <Inputandchallenge />

      <div className="flex items-center justify-center w-full">
        <Scoreboard />
      </div>
    </div>
  );
};

export default App;
