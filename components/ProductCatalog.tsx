import React from 'react';
import { MOCK_PRODUCTS } from '../constants';
import { AppView } from '../types';

interface CatalogProps {
  setView: (view: AppView) => void;
}

export const ProductCatalog: React.FC<CatalogProps> = ({ setView }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 fade-in">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-display font-bold text-gray-900">The Collection</h2>
        <div className="w-16 h-1 bg-black mx-auto mt-4"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-8">
        {MOCK_PRODUCTS.map((product) => (
          <div key={product.id} className="group relative">
            <div className="w-full h-96 bg-gray-200 overflow-hidden aspect-w-1 aspect-h-1">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-center object-cover group-hover:opacity-75 transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button 
                    onClick={() => setView(AppView.FITTING_ROOM)}
                    className="bg-white text-black px-6 py-2 uppercase tracking-wider text-sm font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                >
                    Try On Now
                </button>
              </div>
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-lg text-gray-900 font-display">
                  <a href="#">
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                  </a>
                </h3>
                <p className="mt-1 text-sm text-gray-500">{product.category}</p>
              </div>
              <p className="text-sm font-medium text-gray-900">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};