import { useState } from "react";

let interval;
let seconds = 600;
export default function useTimer() {
  const [time, setTime] = useState("");
  function displayTimer(seconds) {
    let minute = Math.floor(seconds / 60);
    let second = seconds % 60;
    let smallSecond = 0;
    let smallMinute = 0;
    second < 10 ? "" : (smallSecond = "");
    minute < 10 ? "" : (smallMinute = "");
    setTime(`${smallMinute}${minute}:${smallSecond}${second}`);
  }

  clearInterval(interval);
  interval = setInterval(() => {
    displayTimer(seconds);
    seconds--;
  }, 1000);

  return { time, interval };
}
