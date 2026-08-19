// netlify/functions/drive.js
// Esta función corre en los servidores seguros de Netlify, NUNCA en el navegador del usuario.

exports.handler = async (event, context) => {
  const { queryStringParameters } = event;
  const action = queryStringParameters.action;
  
  // La API KEY se configura en el panel de Netlify (Variables de Entorno)
  const API_KEY = process.env.GOOGLE_API_KEY;
  
  if (!API_KEY) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Falta la API Key de Google Drive en el servidor." }),
    };
  }

  try {
    let url = "";
    
    // Acción 1: Obtener las carpetas (Eventos)
    if (action === "getFolders") {
      const parentId = queryStringParameters.parentId;
      if (!parentId) throw new Error("Falta el parentId (ID de la carpeta principal).");
      
      const q = `'${parentId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`;
      // Pedimos: id, name, createdTime para mostrar fecha y nombre del evento
      url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}&key=${API_KEY}&fields=files(id,name,createdTime)&orderBy=createdTime desc`;
    } 
    // Acción 2: Obtener las fotos de un evento
    else if (action === "getPhotos") {
      const folderId = queryStringParameters.folderId;
      if (!folderId) throw new Error("Falta el folderId (ID del evento).");
      
      const q = `'${folderId}' in parents and (mimeType='image/jpeg' or mimeType='image/png' or mimeType='image/webp') and trashed=false`;
      // Pedimos: id, name, thumbnailLink (para la miniatura rápida) y las propiedades de imagen
      url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}&key=${API_KEY}&fields=files(id,name,thumbnailLink,imageMediaMetadata)&pageSize=1000`;
    } 
    else {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Acción no válida. Usa 'getFolders' o 'getPhotos'." }),
      };
    }

    // Hacemos la petición a Google Drive
    const response = await fetch(url);
    const data = await response.json();
    
    // Devolvemos la respuesta al Frontend (React)
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        // Habilitar CORS por si Netlify lo requiere internamente
        "Access-Control-Allow-Origin": "*", 
      },
      body: JSON.stringify(data),
    };
    
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
