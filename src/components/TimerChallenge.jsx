import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

// let timer;

export default function TimerChallenge({ title, time }) {
  const timer = useRef();
  const dialog = useRef();
  const [timeRemaining, setTimeRemaining] = useState(time * 1000);
  const timerIsActive = timeRemaining > 0 && timeRemaining < time * 1000;

  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    setTimeRemaining(time * 1000);
    dialog.current.open();
  }

  function handleReset() {
    setTimeRemaining(time * 1000);
  }

  function handleStart() {
    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);

    setTimeStart(true);
  }

  function handleStop() {
    dialog.current.open();
    clearInterval(timer.current);
  }

  return (
    <>
      <ResultModal
        ref={dialog}
        result="lost"
        time={time}
        timeRemaining={timeRemaining}
        onReset={handleReset}
      />

      <section className="challenge">
        {/* <h2>{title}</h2>
        {timeLeft && <p>you lost</p>} */}
        <p className="challenge-time">
          {time} second{time > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "Stop" : "Start"} Timer
          </button>
        </p>
        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "Timer is running" : "Timer is stopped"}
        </p>
      </section>
    </>
  );
}
