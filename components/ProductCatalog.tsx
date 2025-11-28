import React, { useState, useMemo } from 'react';
import { MOCK_PRODUCTS } from '../constants';
import { AppView, Product } from '../types';

interface CatalogProps {
  setView: (view: AppView) => void;
}

export const ProductCatalog: React.FC<CatalogProps> = ({ setView }) => {
  const [filter, setFilter] = useState<'all' | 'dress' | 'top' | 'outerwear' | 'bottoms'>('all');

  const filteredProducts = useMemo(() => {
    if (filter === 'all') return MOCK_PRODUCTS;
    return MOCK_PRODUCTS.filter(p => p.category === filter);
  }, [filter]);

  const filters = [
    { id: 'all', label: 'All Items' },
    { id: 'dress', label: 'Dresses' },
    { id: 'top', label: 'Tops' },
    { id: 'bottoms', label: 'Bottoms' },
    { id: 'outerwear', label: 'Outerwear' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 fade-in min-h-screen">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-display font-bold text-gray-900">The Collection</h2>
        <div className="w-16 h-1 bg-black mx-auto mt-4 mb-8"></div>
        
        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4">
            {filters.map(f => (
                <button
                    key={f.id}
                    onClick={() => setFilter(f.id as any)}
                    className={`text-sm uppercase tracking-widest px-4 py-2 border-b-2 transition-colors ${filter === f.id ? 'border-black text-black font-bold' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                >
                    {f.label}
                </button>
            ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8">
        {filteredProducts.map((product) => (
          <div key={product.id} className="group relative flex flex-col">
            <div className="w-full aspect-[3/4] bg-gray-100 overflow-hidden relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-center object-cover group-hover:opacity-90 transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                 <button 
                    onClick={() => setView(AppView.FITTING_ROOM)}
                    className="bg-white text-black px-8 py-3 uppercase tracking-widest text-xs font-bold shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-black hover:text-white"
                >
                    Virtual Try-On
                </button>
              </div>
            </div>
            <div className="mt-4 flex justify-between items-start">
              <div>
                <h3 className="text-sm font-display font-bold text-gray-900 uppercase tracking-wide">
                  {product.name}
                </h3>
                <p className="mt-1 text-xs text-gray-500 capitalize">{product.category}</p>
              </div>
              <p className="text-sm font-medium text-gray-900">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-gray-400 font-light">
              No items found in this category.
          </div>
      )}
    </div>
  );
};