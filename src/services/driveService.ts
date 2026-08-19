// src/services/driveService.ts

export interface DriveFolder {
  id: string;
  name: string;
  createdTime: string;
}

export interface DriveFile {
  id: string;
  name: string;
  thumbnailLink: string;
  imageMediaMetadata?: any;
}

// Variables para el entorno real en Netlify
const API_URL = '/.netlify/functions/drive';

export const getFolders = async (parentId: string): Promise<DriveFolder[]> => {
  try {
    const response = await fetch(`${API_URL}?action=getFolders&parentId=${parentId}`);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    if (data.error) throw new Error(data.error);
    return data.files || [];
  } catch (error) {
    console.warn("Fallo al obtener carpetas de Netlify (Probablemente en desarrollo local). Usando Mock Data.", error);
    
    // Mock Data
    return [
      { id: 'mock-1', name: '2026-08-15_RodadaNocturna', createdTime: '2026-08-15T22:00:00.000Z' },
      { id: 'mock-2', name: '2026-08-01_Curva26', createdTime: '2026-08-01T10:00:00.000Z' },
      { id: 'mock-3', name: '2026-07-20_TrackDay', createdTime: '2026-07-20T08:00:00.000Z' },
    ];
  }
};

export const getPhotos = async (folderId: string): Promise<DriveFile[]> => {
  try {
    const response = await fetch(`${API_URL}?action=getPhotos&folderId=${folderId}`);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    if (data.error) throw new Error(data.error);
    return data.files || [];
  } catch (error) {
    console.warn("Fallo al obtener fotos de Netlify (Probablemente en desarrollo local). Usando Mock Data.", error);
    
    // Mock Data
    return Array.from({ length: 8 }).map((_, i) => ({
      id: `photo-${folderId}-${i}`,
      name: `IMG_${8000 + i}.jpg`,
      // Usamos imágenes locales generadas como placeholders o de Unsplash
      thumbnailLink: i % 2 === 0 ? '/hero.png' : '/about.png',
    }));
  }
};

// URL para descargar usando el endpoint nativo de Google (requiere que el archivo sea público y tengamos la API KEY en la función o frontend)
// Dado que la descarga directa de Drive desde un frontend puede ser bloqueada si no usamos la API KEY, 
// la mejor opción para descarga pública es esta sintaxis si el archivo es "Cualquiera con el enlace puede ver":
export const getDownloadUrl = (fileId: string) => {
  return `https://drive.google.com/uc?export=download&id=${fileId}`;
};

// Función de utilidad para mostrar nombres de carpetas
export const formatEventName = (rawName: string) => {
  const parts = rawName.split('_');
  if (parts.length >= 2) {
    const dateStr = parts[0];
    const eventName = parts.slice(1).join(' ');
    
    try {
      const date = new Date(dateStr);
      const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
      const formattedDate = date.toLocaleDateString('es-ES', options);
      return { date: formattedDate, name: eventName };
    } catch(e) {
      return { date: 'Fecha', name: rawName };
    }
  }
  return { date: 'Evento', name: rawName };
};
