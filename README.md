# 🏍️ SHAFT ML - Fotografía Deportiva y Portafolio Web

![SHAFT ML Banner](public/hero.png)

Plataforma web de alto rendimiento y portafolio interactivo para **SHAFT ML**, fotógrafo especializado en motociclismo, rodadas urbanas y cultura de calle. Diseñado para transmitir velocidad, adrenalina y un estilo *edgy*.

## 🚀 Características Principales

*   **Diseño UI/UX "Edgy" y Minimalista:** Interfaz oscura (dark mode nativo) construida con TailwindCSS v4, usando tipografías industriales y animaciones fluidas.
*   **Galería Dinámica "El Asfalto":** Sistema automatizado que organiza eventos y rodadas.
*   **Descargas Directas:** Los usuarios pueden descargar sus fotografías originales sin fricciones.
*   **Arquitectura Serverless Segura:** Integración con **Netlify Functions** para consumir la API de Google Drive sin exponer claves secretas al público.
*   **Mock Data Mode:** El frontend inyecta imágenes generadas por IA si no detecta conexión a la API (ideal para desarrollo local o demos).

## 🛠️ Stack Tecnológico

*   **Frontend:** React (TypeScript) + Vite
*   **Estilos:** TailwindCSS v4
*   **Backend / Serverless:** Netlify Functions (Node.js)
*   **Almacenamiento:** Google Drive API v3
*   **Package Manager:** pnpm

## ⚙️ Configuración y Despliegue (Netlify)

Este proyecto está diseñado para funcionar de manera **100% gratuita** utilizando Netlify y Google Drive.

1.  Crea un proyecto en **Google Cloud Console**, habilita la *Google Drive API* y genera una **API Key**.
2.  Sube este repositorio a GitHub.
3.  Conecta el repositorio a **Netlify**.
4.  En Netlify, ve a `Site configuration` > `Environment variables` y añade:
    *   `GOOGLE_API_KEY`: Tu clave generada en Google Cloud.
5.  En tu código local (`src/components/Gallery.tsx`), asegúrate de que la variable `PARENT_FOLDER_ID` apunte al ID de tu carpeta pública principal de Drive.
6.  Despliega. Netlify compilará el sitio y levantará la función en `/.netlify/functions/drive`.

## 📁 Estructura de Google Drive

Para que la automatización funcione, la carpeta pública de Drive debe tener la siguiente estructura:

```text
Carpeta_Principal (PARENT_FOLDER_ID)
 ├── 2026-10-15_Rodada Nocturna
 │    ├── foto1.jpg
 │    └── foto2.jpg
 └── 2026-11-01_Curva 26
      ├── IMG_001.jpg
      └── IMG_002.jpg
```

---
*Diseñado con pasión para la comunidad motera.*
