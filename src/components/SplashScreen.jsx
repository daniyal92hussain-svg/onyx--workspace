import { useEffect, useState } from 'react';

export default function SplashScreen({ finishLoading }) {
  const [startFadeOut, setStartFadeOut] = useState(false);

  useEffect(() => {
    // 2.5 seconds baad splash screen fade out hona shuru hogi
    const timer = setTimeout(() => {
      setStartFadeOut(true);
      // Fade out animation ke baad component ko remove karne ke liye
      setTimeout(finishLoading, 800); 
    }, 2500);

    return () => clearTimeout(timer);
  }, [finishLoading]);

  return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center bg-slate-50/80 backdrop-blur-2xl transition-all duration-1000 ease-in-out ${startFadeOut ? 'opacity-0 invisible scale-110' : 'opacity-100'}`}>
      
      <div className="flex flex-col items-center">
        {/* 🌟 LOGO WITH LEFT-TO-RIGHT TRANSITION 🌟 */}
        <div className="relative mb-6 animate-[slideRight_1s_ease-out_forwards]">
          <svg width="80" height="80" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="splashGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop stopColor="#818cf8"/>
                <stop offset="1" stopColor="#3730a3"/>
              </linearGradient>
            </defs>
            <path d="M16 2C16 2 20 12 30 16C30 16 20 20 16 30C16 30 12 20 2 16C2 16 12 12 16 2Z" fill="url(#splashGrad)"/>
            <path d="M16 8C16 8 18 14 24 16C24 16 18 18 16 24C16 24 14 18 8 16C8 16 14 14 16 8Z" fill="white" opacity="0.8"/>
          </svg>
        </div>

        {/* 🌟 WELCOME TEXT WITH FADE IN 🌟 */}
        <div className="overflow-hidden">
          <h2 className="text-2xl font-black text-slate-800 tracking-tighter animate-[fadeInUp_2.2s_ease-out_forwards] opacity-0">
            Welcome to <span className="text-indigo-600">Onyx</span>
          </h2>
          <p className="text-slate-400 text-[13px] font-bold text-center mt-2 animate-[fadeInUp_2.5s_ease-out_forwards] opacity-0">
            Setting up your workspace...
          </p>
        </div>
      </div>

      {/* CSS Animations directly inside the component for ease */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideRight {
          0% { transform: translateX(-100px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeInUp {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `}} />
    </div>
  );
}