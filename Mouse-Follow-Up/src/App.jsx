import { useState, useEffect } from "react";
import "./styles/App.css";

function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);
  const [wave, setWave] = useState(false);

  const handleHiding = () => {
    if (!enabled) {
      document.body.style.cursor = "none";
    } else {
      document.body.style.cursor = "auto";
    }
    setEnabled(!enabled);
  };

  const handleAnimation = () => {
    setWave(true);
    setTimeout(() => setWave(false), 600); // igual a la duración de la animación CSS
  };

  useEffect(() => {
    const handleMove = (event) => {
      const { clientX, clientY } = event;
      setPosition({ x: clientX, y: clientY });
    };
    if (enabled) {
      window.addEventListener("pointermove", handleMove);
    }
    return () => window.removeEventListener("pointermove", handleMove);
  }, [enabled]);

  return (
    <>
      <div
        className={`mouse-sprite ${wave ? "wave" : ""}`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
        onClick={handleAnimation}
      />
      <button onClick={handleHiding} className={enabled ? "enabled" : ""}>
        {enabled ? "Desactivar" : "Activar"} Mouse Follow Up
      </button>
    </>
  );
}

export default App;
