import { useState, useEffect, useCallback, useRef } from 'react';

export function useOtpCountdown(initialTime = 300) {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isActive, setIsActive] = useState(true);
  const [isExpired, setIsExpired] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Format time as MM:SS
  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }, []);

  // Start/reset countdown
  const startCountdown = useCallback(() => {
    setTimeLeft(initialTime);
    setIsActive(true);
    setIsExpired(false);
  }, [initialTime]);

  useEffect(() => {
    if (!isActive) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive]);

  // Handle expiry when timeLeft hits 0
  useEffect(() => {
    if (timeLeft === 0) {
      setIsExpired(true);
      setIsActive(false);
    }
  }, [timeLeft]);

  return {
    timeLeft,
    formattedTime: formatTime(timeLeft),
    isExpired,
    startCountdown,
  };
}
