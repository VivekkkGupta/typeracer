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
    <div className="bg-black w-full h-screen text-white relative text-5xl overflow-hidden font-Roboto">
      <Navbar />

      <div className="h-[25vh] w-full">
        <TimerAndRestart />
      </div>

      <div className="h-[30vh] w-full py-5">
        <Inputandchallenge />
      </div>

      <div className="h-[40vh] w-full">
        <Scoreboard />
      </div>
    </div>
  );
};

export default App;
