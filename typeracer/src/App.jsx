import { useEffect } from "react";
import Scoreboard from "./components/Scoreboard";
import Navbar from "./components/Navbar";
import TimerAndRestart from "./components/TimerAndRestart";
import Inputandchallenge from "./components/Inputandchallenge";
import { useTypeRacerContext } from "./contexts/TypeRacerContext";
import { useThemeContext } from "./contexts/ThemeContext";
;
import { motion, AnimatePresence } from 'framer-motion';

const App = () => {
  const { isTyping, setIsTyping, testOver, setTestOver, setTimer, gameOver, gameTextSize, gameRestart, gameModeWordsOrSentences } = useTypeRacerContext();

  const { theme } = useThemeContext()

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

  useEffect(() => {
    gameRestart()
  }, [theme, gameTextSize, gameModeWordsOrSentences])

  return (
    <div className={`bg-gray-300 dark:bg-black w-full h-screen text-black dark:text-white relative 
    ${gameTextSize === 'small' ? 'text-3xl' : gameTextSize === 'medium' ? 'text-4xl' : 'text-5xl'}
     
    overflow-hidden font-Roboto flex flex-col justify-between`}>

      <Navbar />

      <div className="h-[25vh] w-full ">
        <TimerAndRestart />
      </div>

      <AnimatePresence>
        <motion.div className={`h-[30vh] w-full transition-all duration-500`}>
          <Inputandchallenge />
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        <motion.div className={`transition-all duration-500 w-full`}
          initial={{ height: '25vh' }}
          animate={{ height: gameOver ? '50vh' : '25vh' }}
        >
          < Scoreboard />
        </motion.div>
      </AnimatePresence>


    </div >
  );
};

export default App;
