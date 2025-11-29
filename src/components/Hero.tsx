'use client';

export const Hero = () => {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 pt-40 pb-4">
      <div className="text-left">
        <div className="mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
            Harison Rios
          </h1>
          <p className="text-sm md:text-lg text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-500 font-semibold">
            Data Engineer • 20 years old
          </p>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-gray-300 text-xs">São Paulo, Brazil</p>
          <img
            src="https://upload.wikimedia.org/wikipedia/en/0/05/Flag_of_Brazil.svg"
            alt="Brazil flag"
            className="w-4 h-3"
          />
        </div>

        <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-8">
          On my free time, I develop <span className="text-white font-semibold">full-stack</span> solutions and dive into worlds of 
          <span className="text-white font-semibold"> games</span>, 
          <span className="text-white font-semibold"> rap</span> and 
          <span className="text-white font-semibold"> trap</span> — always seeking to unite 
          <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-500 font-semibold"> technology and creativity</span>.
        </p>
      </div>
    </div>
  );
};
