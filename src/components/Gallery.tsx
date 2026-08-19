import { useState, useEffect } from 'react';
import { getFolders, getPhotos, getDownloadUrl, formatEventName, type DriveFolder, type DriveFile } from '../services/driveService';
import Lightbox from './Lightbox';

// El ID de la carpeta raíz de SHAFT ML. 
// En producción, debería venir de una variable de entorno, pero por simplicidad se puede hardcodear si la carpeta es pública.
const PARENT_FOLDER_ID = "YOUR_MAIN_DRIVE_FOLDER_ID"; 

const Gallery = () => {
  const [folders, setFolders] = useState<DriveFolder[]>([]);
  const [currentFolder, setCurrentFolder] = useState<DriveFolder | null>(null);
  const [photos, setPhotos] = useState<DriveFile[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [loadingPhotos, setLoadingPhotos] = useState(false);

  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<DriveFile | null>(null);

  useEffect(() => {
    // Cargar Eventos al montar el componente
    const fetchFolders = async () => {
      setLoading(true);
      const data = await getFolders(PARENT_FOLDER_ID);
      setFolders(data);
      setLoading(false);
    };
    fetchFolders();
  }, []);

  const handleOpenFolder = async (folder: DriveFolder) => {
    setCurrentFolder(folder);
    setLoadingPhotos(true);
    const data = await getPhotos(folder.id);
    setPhotos(data);
    setLoadingPhotos(false);
  };

  const handleBack = () => {
    setCurrentFolder(null);
    setPhotos([]);
  };

  const openLightbox = (photo: DriveFile) => {
    setSelectedPhoto(photo);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedPhoto(null);
  };

  const downloadPhoto = () => {
    if (selectedPhoto) {
      // Abre la URL de descarga directa en una nueva pestaña (automáticamente fuerza la descarga)
      window.open(getDownloadUrl(selectedPhoto.id), '_blank');
    }
  };

  return (
    <section id="galeria" className="py-24 bg-base min-h-screen border-t border-white/5 relative">
      <div className="container mx-auto px-6">
        
        {/* Cabecera */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <div className="h-1 w-8 bg-accent"></div>
              <h2 className="text-4xl md:text-6xl text-white font-display uppercase">El <span className="text-accent">Asfalto</span></h2>
            </div>
            <p className="text-gray-400 font-body text-lg">
              {currentFolder ? 'Selecciona una foto para descargarla.' : 'Explora los eventos más recientes.'}
            </p>
          </div>
          
          {currentFolder && (
            <button 
              onClick={handleBack}
              className="mt-6 md:mt-0 flex items-center gap-2 text-gray-400 hover:text-accent font-display tracking-widest uppercase transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver a Eventos
            </button>
          )}
        </div>

        {/* Vista 1: Lista de Eventos (Carpetas) */}
        {!currentFolder && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              // Esqueleto de carga
              Array.from({length: 3}).map((_, i) => (
                <div key={i} className="h-40 bg-[#111] animate-pulse border border-white/5 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full border-2 border-accent/50 border-t-accent animate-spin"></div>
                </div>
              ))
            ) : folders.length > 0 ? (
              folders.map(folder => {
                const { date, name } = formatEventName(folder.name);
                return (
                  <div 
                    key={folder.id} 
                    onClick={() => handleOpenFolder(folder)}
                    className="group relative bg-[#0a0a0a] border border-white/10 overflow-hidden cursor-pointer hover:border-accent transition-colors duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="p-8 relative z-10">
                      <p className="text-accent font-mono text-sm mb-2">{date}</p>
                      <h3 className="text-2xl text-white font-display uppercase tracking-wider">{name}</h3>
                      <div className="mt-8 flex justify-end">
                        <span className="inline-flex items-center gap-2 text-sm text-gray-500 group-hover:text-white transition-colors uppercase tracking-widest font-bold">
                          Ver Galería 
                          <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500 col-span-full text-center py-10 font-mono">No se encontraron eventos recientes.</p>
            )}
          </div>
        )}

        {/* Vista 2: Fotos del Evento */}
        {currentFolder && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {loadingPhotos ? (
              Array.from({length: 8}).map((_, i) => (
                <div key={i} className="aspect-square bg-[#111] animate-pulse border border-white/5"></div>
              ))
            ) : photos.length > 0 ? (
              photos.map(photo => (
                <div 
                  key={photo.id}
                  onClick={() => openLightbox(photo)}
                  className="aspect-square relative overflow-hidden group cursor-pointer border border-transparent hover:border-accent/50 transition-colors"
                >
                  <img 
                    src={photo.thumbnailLink} 
                    alt={photo.name}
                    className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                  />
                  {/* Overlay en hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center py-10 font-mono">Esta galería está vacía.</p>
            )}
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <Lightbox 
          isOpen={lightboxOpen}
          // En modo real (Drive API), podemos usar la thumbnail de alta calidad o la URL base. 
          // Drive API devuelve =s220 en la thumbnail, cambiamos a =s2048 para máxima calidad sin descargar:
          imageUrl={selectedPhoto.thumbnailLink.replace('=s220', '=s2048')}
          imageName={selectedPhoto.name}
          onClose={closeLightbox}
          onDownload={downloadPhoto}
        />
      )}
    </section>
  );
};

export default Gallery;
