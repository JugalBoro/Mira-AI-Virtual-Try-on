import React from 'react';
import { AppView } from '../types';

interface HeaderProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 cursor-pointer" onClick={() => setView(AppView.HOME)}>
            <span className="font-display text-2xl tracking-widest font-bold text-gray-900">MIRRA</span>
          </div>
          
          <div className="hidden md:flex space-x-8 items-center">
            <button 
              onClick={() => setView(AppView.HOME)}
              className={`text-sm font-medium transition-colors ${currentView === AppView.HOME ? 'text-black' : 'text-gray-500 hover:text-black'}`}
            >
              HOME
            </button>
            <button 
              onClick={() => setView(AppView.CATALOG)}
              className={`text-sm font-medium transition-colors ${currentView === AppView.CATALOG ? 'text-black' : 'text-gray-500 hover:text-black'}`}
            >
              COLLECTION
            </button>
            <button 
              onClick={() => setView(AppView.FITTING_ROOM)}
              className={`px-4 py-2 bg-black text-white text-xs tracking-widest font-bold hover:bg-gray-800 transition-colors ${currentView === AppView.FITTING_ROOM ? 'bg-gray-800' : ''}`}
            >
              VIRTUAL FITTING
            </button>
          </div>

          <div className="md:hidden">
            {/* Mobile menu button could go here */}
            <button onClick={() => setView(AppView.FITTING_ROOM)} className="text-gray-900">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};