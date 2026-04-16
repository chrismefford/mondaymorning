import logoPrimaryGold from "@/assets/logo-primary-gold.svg";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-forest">
      {/* Grain texture */}
      <div className="grain absolute inset-0 pointer-events-none opacity-30" />
      
      {/* Animated logo */}
      <div className="relative animate-pulse-slow">
        <span className="inline-flex items-start">
          <img 
            src={logoPrimaryGold} 
            alt="Monday Morning" 
            className="w-48 h-auto md:w-64"
          />
          <span className="font-sans text-xs leading-none select-none ml-1 mt-1 text-gold">™</span>
        </span>
        
        {/* Loading bar */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-24 h-1 bg-gold/20 rounded-full overflow-hidden">
          <div className="h-full bg-gold rounded-full animate-loading-progress" />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
