// components/auth/user_verification/OtpTimer.tsx

import { useState, useEffect } from "react";

const OtpTimer = ({ time, onTimeout, resetTrigger }) => {
  const [timer, setTimer] = useState(time);

  useEffect(() => {
    setTimer(time); // Reset the timer when the `time` prop changes
  }, [time]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(interval);
          onTimeout();
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [resetTrigger, onTimeout]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return <>{formatTime(timer)}</>;
};

export default OtpTimer;
