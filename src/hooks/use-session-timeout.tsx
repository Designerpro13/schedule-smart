'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export const useSessionTimeout = (timeout: number) => {
  const [active, setActive] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [remaining, setRemaining] = useState(timeout);
  
  const timeoutId = useRef<NodeJS.Timeout>();
  const intervalId = useRef<NodeJS.Timeout>();

  const handleLogout = useCallback(() => {
    setActive(false);
    setIsModalOpen(false);
    // In a real app, this would redirect to a login page
    alert("You have been logged out due to inactivity.");
  }, []);
  
  const resetTimer = useCallback(() => {
    if (!active) return;
    
    setRemaining(timeout);
    if (timeoutId.current) clearTimeout(timeoutId.current);
    if (intervalId.current) clearInterval(intervalId.current);

    timeoutId.current = setTimeout(() => {
      setIsModalOpen(true);
      intervalId.current = setInterval(() => {
        setRemaining(prev => {
          if (prev <= 1000) {
            handleLogout();
            return 0;
          }
          return prev - 1000;
        });
      }, 1000);
    }, timeout);
  }, [active, timeout, handleLogout]);

  const handleStay = useCallback(() => {
    setIsModalOpen(false);
    resetTimer();
  }, [resetTimer]);

  useEffect(() => {
    if (active) {
      const events = ['mousemove', 'keydown', 'click', 'scroll'];
      const eventListener = () => resetTimer();
      
      events.forEach(event => window.addEventListener(event, eventListener));
      resetTimer();

      return () => {
        events.forEach(event => window.removeEventListener(event, eventListener));
        if (timeoutId.current) clearTimeout(timeoutId.current);
        if (intervalId.current) clearInterval(intervalId.current);
      };
    }
  }, [resetTimer, active]);

  return { isModalOpen, handleStay, handleLogout, active, remaining };
};
