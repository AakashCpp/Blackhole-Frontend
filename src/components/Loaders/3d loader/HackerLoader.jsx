import HackerMask3D from "./HackerMask3D";

const HackerLoader = () => {
  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center">
      {/* Glow */}
      <div className="absolute w-96 h-96 bg-green-500 blur-3xl opacity-20 animate-pulse" />

      {/* 3D Mask */}
      <div className="w-64 h-64 animate-fade">
        <HackerMask3D />
      </div>

      {/* Text */}
      <p className="mt-6 text-green-400 font-mono tracking-widest text-sm animate-pulse">
        INITIALIZING SCAN...
      </p>
    </div>
  );
};

export default HackerLoader;
