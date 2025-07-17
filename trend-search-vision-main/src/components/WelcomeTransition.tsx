import { useState, useEffect } from "react";

export const WelcomeTransition = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-background z-50 flex items-center justify-center animate-fade-out">
      <div className="text-center space-y-4 animate-scale-in">
        <div className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent animate-fade-in">
          Welcome
        </div>
        <div className="text-xl md:text-2xl text-muted-foreground animate-fade-in animation-delay-300">
          to my Stock AI Predictor
        </div>
        <div className="text-lg text-primary font-medium animate-fade-in animation-delay-600">
          Created by Yash Kabadwal
        </div>
      </div>
    </div>
  );
};