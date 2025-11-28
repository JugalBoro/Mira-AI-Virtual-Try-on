import React, { useState, useRef, useEffect } from 'react';
import { Product } from '../types';
import { MOCK_PRODUCTS } from '../constants';
import { generateTryOn, getStylistReview } from '../services/geminiService';

export const FittingRoom: React.FC = () => {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [stylistComment, setStylistComment] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserImage(reader.result as string);
        setResultImage(null);
        setStylistComment(null);
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
        setStylistComment(null);
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
    setStylistComment(null);

    try {
      const generatedImage = await generateTryOn(userImage, selectedProduct.description);
      setResultImage(generatedImage);
      
      // Get stylist review in background
      const review = await getStylistReview(generatedImage, selectedProduct.name);
      setStylistComment(review);
    } catch (err) {
      setError("Failed to generate the look. Please try again with a clearer photo.");
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const resetView = () => {
      setResultImage(null);
      setStylistComment(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 fade-in">
      <div className="text-center mb-12">
        <h2 className="font-display text-4xl mb-4">The Fitting Room</h2>
        <p className="text-gray-500 max-w-2xl mx-auto font-light">
            Upload your photo, select a piece from our collection, and let our AI tailor it to you instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Input & Output */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white p-6 shadow-sm border border-gray-100 min-h-[600px] flex flex-col relative">
             
             {/* Stage Area */}
             <div className="flex-1 relative bg-gray-50 flex items-center justify-center overflow-hidden border border-dashed border-gray-200 min-h-[500px]">
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
                  <div className="relative w-full h-full animate-fadeIn">
                    <img src={resultImage} alt="Result" className="w-full h-full object-contain" />
                    <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 text-xs tracking-widest backdrop-blur-sm">MIRRA • AI</div>
                    
                    <button 
                      onClick={resetView} 
                      className="absolute top-4 left-4 bg-white/90 text-black px-4 py-2 text-sm shadow-lg hover:bg-white rounded-full flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                      Try Another
                    </button>
                  </div>
                ) : userImage ? (
                  <div className="relative w-full h-full">
                    <img src={userImage} alt="User" className="w-full h-full object-contain" />
                    <button 
                      onClick={() => setUserImage(null)} 
                      className="absolute top-4 right-4 bg-white/80 p-2 rounded-full hover:bg-white text-gray-800 shadow-sm"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                ) : (
                  <div className="text-center p-8">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                    <h3 className="text-lg font-display font-semibold mb-2">Upload your photo</h3>
                    <p className="text-gray-500 mb-8 font-light max-w-xs mx-auto text-sm">Use a well-lit, full-body photo for the best AI fitting accuracy.</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="px-8 py-3 bg-white border border-gray-200 text-gray-900 hover:border-black transition-colors uppercase text-xs font-bold tracking-widest shadow-sm"
                      >
                        Upload Image
                      </button>
                      <button 
                        onClick={startCamera}
                        className="px-8 py-3 bg-black text-white hover:bg-gray-800 transition-colors uppercase text-xs font-bold tracking-widest shadow-lg"
                      >
                        Open Camera
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
                  <div className="absolute inset-0 bg-white/90 backdrop-blur-md z-20 flex flex-col items-center justify-center">
                    <div className="w-16 h-16 border-4 border-gray-100 border-t-black rounded-full animate-spin mb-6"></div>
                    <h3 className="font-display text-xl mb-2 animate-pulse">Designing your look</h3>
                    <p className="text-gray-400 text-sm font-light">Our AI stylist is tailoring the {selectedProduct?.name}...</p>
                  </div>
                )}
             </div>

            {/* Stylist Notes Section - Moved below image */}
            {resultImage && stylistComment && (
                <div className="mt-6 bg-gray-50 p-5 rounded-lg border border-gray-100 flex items-start space-x-4 animate-fade-in">
                    <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white font-display shadow-md">M</div>
                    </div>
                    <div className="flex-1">
                        <h4 className="font-display text-sm font-bold text-gray-900 mb-1 uppercase tracking-wide">Stylist Analysis</h4>
                        <p className="text-sm text-gray-600 italic leading-relaxed">"{stylistComment}"</p>
                    </div>
                </div>
            )}

             {/* Action Bar */}
             <div className="mt-6 flex justify-between items-center border-t border-gray-100 pt-4">
                <div className="flex flex-col">
                    <span className="text-xs text-gray-400 uppercase tracking-wider mb-1">Selected Item</span>
                    <span className="text-sm font-semibold text-gray-900">
                    {selectedProduct ? selectedProduct.name : 'None'}
                    </span>
                </div>
                <button
                  onClick={handleTryOn}
                  disabled={!userImage || !selectedProduct || isGenerating}
                  className={`px-10 py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300
                    ${(!userImage || !selectedProduct || isGenerating) 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-black text-white hover:bg-gray-900 hover:scale-105 shadow-xl'
                    }`}
                >
                  Generate Try-On
                </button>
             </div>
             {error && <p className="text-red-500 text-sm mt-4 text-center bg-red-50 p-2">{error}</p>}
          </div>
        </div>

        {/* Right Column: Wardrobe */}
        <div className="lg:col-span-4">
          <div className="bg-white p-6 shadow-sm border border-gray-100 h-[600px] flex flex-col">
            <h3 className="font-display text-xl mb-4">Wardrobe</h3>
            <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
              {MOCK_PRODUCTS.map(product => (
                <div 
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className={`group cursor-pointer flex gap-4 p-3 border transition-all duration-200 ${selectedProduct?.id === product.id ? 'border-black bg-gray-50' : 'border-transparent hover:border-gray-100 hover:bg-gray-50'}`}
                >
                  <div className="w-16 h-20 flex-shrink-0 overflow-hidden bg-gray-200">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="font-display text-xs font-bold uppercase tracking-wide text-gray-900">{product.name}</h4>
                    <p className="text-xs text-gray-500 mt-1">{product.category}</p>
                    <span className="text-xs font-bold mt-2 text-gray-900">${product.price}</span>
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