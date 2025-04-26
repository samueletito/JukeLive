import React from "react";
import axios from "axios";

// VARIABLES DE ENTORNO
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function App() {
  // VARIABLES DE ESTADO
  const [identifier, setIdentifier] = React.useState("");
  const [songUri, setSongUri] = React.useState("");
  const [joined, setJoined] = React.useState(false);

  // FUNCIONES
  const loginWithSpotify = () => {
    window.location.href = `${VITE_BACKEND_URL}/login`;
  };

  const joinSession = () => {
    if (identifier) {
      setJoined(true);
    }
  };

  const addSong = async () => {
    if (!identifier || !songUri) return;
    try {
      await axios.post(`${VITE_BACKEND_URL}/add-song`, { identifier, songUri });
      alert("Canción añadida a la cola");
    } catch (error) {
      alert("Error al añadir la canción");
    }
  };

  // VISTA JSX
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">JukeLive</h1>
      <button
        onClick={loginWithSpotify}
        className="bg-green-500 px-4 py-2 rounded-lg mb-4"
      >
        Iniciar sesión con Spotify
      </button>
      <div className="flex flex-col items-center">
        <input
          type="text"
          placeholder="Código identificador"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          className="text-black px-2 py-1 rounded mb-2"
        />
        <button
          onClick={joinSession}
          className="bg-blue-500 px-4 py-2 rounded-lg mb-4"
        >
          Unirse a una sesión
        </button>
      </div>
      {joined && (
        <div className="flex flex-col items-center">
          <input
            type="text"
            placeholder="Spotify URI"
            value={songUri}
            onChange={(e) => setSongUri(e.target.value)}
            className="text-black px-2 py-1 rounded mb-2"
          />
          <button
            onClick={addSong}
            className="bg-red-500 px-4 py-2 rounded-lg"
          >
            Añadir canción
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
