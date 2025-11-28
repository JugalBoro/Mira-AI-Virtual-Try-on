import React from 'react';
import { AppView } from '../types';

interface HeroProps {
  setView: (view: AppView) => void;
}

export const Hero: React.FC<HeroProps> = ({ setView }) => {
  return (
    <div className="relative bg-white overflow-hidden fade-in">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 min-h-[85vh] flex flex-col justify-center">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl font-display">
                <span className="block xl:inline">Experience fashion</span>{' '}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-black">reimagined by AI.</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 font-light">
                Step into the future of luxury shopping. MIRRA allows you to virtually try on our exclusive collection with photorealistic precision.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-none shadow">
                  <button
                    onClick={() => setView(AppView.FITTING_ROOM)}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium text-white bg-black hover:bg-gray-800 md:py-4 md:text-lg md:px-10 transition-all uppercase tracking-widest"
                  >
                    Enter Fitting Room
                  </button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <button
                    onClick={() => setView(AppView.CATALOG)}
                    className="w-full flex items-center justify-center px-8 py-3 border border-black text-base font-medium text-black bg-transparent hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition-all uppercase tracking-widest"
                  >
                    View Collection
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1600"
          alt="Fashion Model"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/20 to-transparent lg:via-white/0"></div>
      </div>
    </div>
  );
};