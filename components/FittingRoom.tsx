import React, { useState, useRef, useEffect } from 'react';
import { Product, GeneratedLook } from '../types';
import { MOCK_PRODUCTS } from '../constants';
import { generateTryOn } from '../services/geminiService';

export const FittingRoom: React.FC = () => {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  // Clean up URL objects to avoid memory leaks
  useEffect(() => {
    return () => {
      // If we were using object URLs, we'd revoke them here.
      // Since we use base64 for this specific flow, it's less critical, 
      // but good practice if we switched to Blob URLs.
    };
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserImage(reader.result as string);
        setResultImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    setIsCameraOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError("Could not access camera. Please upload a photo instead.");
      setIsCameraOpen(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        const dataUrl = canvasRef.current.toDataURL('image/jpeg');
        setUserImage(dataUrl);
        setResultImage(null);
        stopCamera();
      }
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraOpen(false);
  };

  const handleTryOn = async () => {
    if (!userImage || !selectedProduct) return;

    setIsGenerating(true);
    setError(null);
    setResultImage(null);

    try {
      const generatedImage = await generateTryOn(userImage, selectedProduct.description);
      setResultImage(generatedImage);
    } catch (err) {
      setError("Failed to generate the look. Please try again with a clearer photo.");
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 fade-in">
      <div className="text-center mb-12">
        <h2 className="font-display text-4xl mb-4">The Fitting Room</h2>
        <p className="text-gray-500 max-w-2xl mx-auto font-light">Upload your photo, select a piece from our collection, and let our AI tailor it to you instantly.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Input & Output */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white p-6 shadow-sm border border-gray-100 min-h-[600px] flex flex-col">
             
             {/* Stage Area */}
             <div className="flex-1 relative bg-gray-50 flex items-center justify-center overflow-hidden border border-dashed border-gray-200">
                {isCameraOpen ? (
                  <div className="relative w-full h-full flex flex-col items-center justify-center bg-black">
                     <video ref={videoRef} className="max-h-full max-w-full object-contain" playsInline muted></video>
                     <canvas ref={canvasRef} className="hidden"></canvas>
                     <div className="absolute bottom-4 flex space-x-4">
                        <button onClick={capturePhoto} className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-gray-200">Capture</button>
                        <button onClick={stopCamera} className="bg-red-500 text-white px-6 py-2 rounded-full font-bold hover:bg-red-600">Cancel</button>
                     </div>
                  </div>
                ) : resultImage ? (
                  <div className="relative w-full h-full">
                    <img src={resultImage} alt="Result" className="w-full h-full object-contain" />
                    <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 text-xs">AI GENERATED</div>
                    <button 
                      onClick={() => setResultImage(null)} 
                      className="absolute bottom-4 right-4 bg-white text-black px-4 py-2 text-sm shadow-lg hover:bg-gray-100"
                    >
                      Show Original
                    </button>
                  </div>
                ) : userImage ? (
                  <div className="relative w-full h-full">
                    <img src={userImage} alt="User" className="w-full h-full object-contain" />
                    <button 
                      onClick={() => setUserImage(null)} 
                      className="absolute top-4 right-4 bg-white/80 p-2 rounded-full hover:bg-white text-gray-800"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                ) : (
                  <div className="text-center p-8">
                    <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    <p className="text-gray-500 mb-6 font-light">Upload a full-body photo for best results</p>
                    <div className="flex justify-center space-x-4">
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="px-6 py-2 border border-black text-black hover:bg-black hover:text-white transition-colors uppercase text-sm tracking-wider"
                      >
                        Upload Photo
                      </button>
                      <button 
                        onClick={startCamera}
                        className="px-6 py-2 bg-black text-white hover:bg-gray-800 transition-colors uppercase text-sm tracking-wider"
                      >
                        Use Camera
                      </button>
                    </div>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileUpload} 
                      accept="image/*" 
                      className="hidden" 
                    />
                  </div>
                )}
                
                {isGenerating && (
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
                    <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin mb-4"></div>
                    <p className="font-display text-xl animate-pulse">Designing your look...</p>
                  </div>
                )}
             </div>

             {/* Action Bar */}
             <div className="mt-6 flex justify-between items-center border-t border-gray-100 pt-4">
                <div className="text-sm text-gray-500">
                  {selectedProduct ? `Selected: ${selectedProduct.name}` : 'Select an item from the collection'}
                </div>
                <button
                  onClick={handleTryOn}
                  disabled={!userImage || !selectedProduct || isGenerating}
                  className={`px-8 py-3 text-sm font-bold tracking-widest uppercase transition-all
                    ${(!userImage || !selectedProduct || isGenerating) 
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                      : 'bg-black text-white hover:bg-gray-800 shadow-lg hover:shadow-xl'
                    }`}
                >
                  Generate Try-On
                </button>
             </div>
             {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
          </div>
        </div>

        {/* Right Column: Wardrobe */}
        <div className="lg:col-span-4">
          <div className="bg-white p-6 shadow-sm border border-gray-100 h-[600px] flex flex-col">
            <h3 className="font-display text-xl mb-4 border-b border-gray-100 pb-2">Wardrobe</h3>
            <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
              {MOCK_PRODUCTS.map(product => (
                <div 
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className={`group cursor-pointer flex gap-4 p-2 border transition-all ${selectedProduct?.id === product.id ? 'border-black bg-gray-50' : 'border-transparent hover:border-gray-200'}`}
                >
                  <div className="w-20 h-24 flex-shrink-0 overflow-hidden bg-gray-100">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="font-display text-sm font-semibold">{product.name}</h4>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{product.description}</p>
                    <span className="text-xs font-bold mt-2">${product.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};