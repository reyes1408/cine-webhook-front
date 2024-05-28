import React, { useState } from "react";

const Silla = ({ id, comprado, onCompra }) => {
  const [hovered, setHovered] = useState(false);

  const handleHover = () => {
    setHovered(!hovered);
  };

  const handleCompra = () => {
    // Enviar la información al WebSocket
    onCompra({ type: "comprar", id });
  };

  return (
    <div
      className={`w-20 h-20 flex justify-center items-center cursor-pointer transition-colors rounded-lg duration-300 ${comprado ? "bg-blue-900" : "bg-gray-300"} ${hovered && !comprado ? "hover:bg-gray-400" : ""}`}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      onClick={!comprado ? handleCompra : null} // Desactiva la compra cuando está comprado
    >
      <p className="text-white">{id}</p>
      {!comprado && hovered && (
        <button onClick={handleCompra} className="buy-button bg-orange-500 hover:bg-orange-600 text-white px-2 py-1 rounded-md">
          Comprar
        </button>
      )}
    </div>
  );
};

export default Silla;
