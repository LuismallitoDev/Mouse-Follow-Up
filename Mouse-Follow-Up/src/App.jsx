import { useState, useEffect, useRef } from "react";
import "./styles/App.css";

function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);
  const [isColliding, setIsColliding] = useState(false);

  const buttonRef = useRef(null);
  const mouse = document.getElementById("click-animation");
  const handleHiding = () => {
    document.body.style.cursor = enabled ? "auto" : "none";
    setEnabled(!enabled);
  };

  // Detectar colisión entre cursor y botón
  const checkCollision = (mouseX, mouseY) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const inside =
        mouseX >= rect.left &&
        mouseX <= rect.right &&
        mouseY >= rect.top &&
        mouseY <= rect.bottom;
      setIsColliding(inside);
    }
  };

  const handleAnimation = () => {
    mouse.style.position = "absolute";
    mouse.style.transform = `scale(1.05) ,  transform(${position.x}px, ${position.y}px)`;
    mouse.style.backgroundColor = "rgb(77, 139, 220)";
    mouse.classList.add("click-animation");
    setTimeout(() => {
      mouse.style.position = "absolute";
      mouse.style.tra = "100%";
      mouse.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    }, 200);
    setTimeout(() => {
      mouse.classList.remove("click-animation");
    }, 600);
  };
  useEffect(() => {
    const handleMove = (event) => {
      const { clientX, clientY } = event;
      setPosition({ x: clientX, y: clientY });
      checkCollision(clientX, clientY);
    };

    if (enabled) {
      window.addEventListener("pointermove", handleMove);
    }

    return () => {
      window.removeEventListener("pointermove", handleMove);
    };
  }, [enabled]);

  return (
    <>
      <div
        className={`mouse-sprite`}
        id={"click-animation"}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          display: enabled ? "block" : "none",
          pointerEvents: isColliding ? "none" : "initial",
        }}
        onClick={handleAnimation}
      />
      <button
        ref={buttonRef}
        onClick={handleHiding}
        className={enabled ? "enabled" : ""}
      >
        {enabled ? "Desactivar" : "Activar"} Mouse Follow Up
      </button>
    </>
  );
}

export default App;
