import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { FittingRoom } from './components/FittingRoom';
import { StyleAssistant } from './components/StyleAssistant';
import { AppView } from './types';

function App() {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);

  const renderView = () => {
    switch (currentView) {
      case AppView.HOME:
        return <Hero setView={setCurrentView} />;
      case AppView.CATALOG:
        return <ProductCatalog setView={setCurrentView} />;
      case AppView.FITTING_ROOM:
        return <FittingRoom />;
      default:
        return <Hero setView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header currentView={currentView} setView={setCurrentView} />
      
      <main>
        {renderView()}
      </main>

      <StyleAssistant />

      <footer className="bg-gray-50 border-t border-gray-100 mt-20">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <span className="text-gray-400 hover:text-gray-500 cursor-pointer">Instagram</span>
            <span className="text-gray-400 hover:text-gray-500 cursor-pointer">Twitter</span>
            <span className="text-gray-400 hover:text-gray-500 cursor-pointer">Pinterest</span>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-gray-400 font-light">
              &copy; 2024 MIRRA AI Fashion. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;