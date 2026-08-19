import React from 'react';

interface LightboxProps {
  isOpen: boolean;
  imageUrl: string;
  imageName: string;
  onClose: () => void;
  onDownload: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ isOpen, imageUrl, imageName, onClose, onDownload }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      
      {/* Botón Cerrar */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 text-white/50 hover:text-accent transition-colors z-50 p-2"
        aria-label="Cerrar"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Contenedor de la Imagen */}
      <div className="relative max-w-7xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center">
        <img 
          src={imageUrl} 
          alt={imageName} 
          className="max-w-full max-h-full object-contain shadow-2xl"
        />
        
        {/* Metadatos y Descarga */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between w-full max-w-3xl gap-4">
          <div className="text-gray-400 font-body text-sm font-mono text-center sm:text-left">
            <p className="text-white font-display text-xl uppercase tracking-widest">{imageName}</p>
            <p>SHAFT ML &copy; {new Date().getFullYear()}</p>
          </div>
          
          <button 
            onClick={onDownload}
            className="flex items-center gap-2 bg-accent text-white font-display text-lg px-8 py-3 uppercase tracking-widest hover:bg-white hover:text-base transition-colors duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Descargar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Lightbox;
