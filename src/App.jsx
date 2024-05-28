import React, { useState, useEffect } from "react";
import './App.css';

import Silla from "./components/silla";

function App() {
  const [socket, setSocket] = useState(null);
  const [usuariosConectados, setUsuariosConectados] = useState(0);
  const [sillas, setSillas] = useState([]);
  const [sillasVendidas, setSillasVendidas] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/userOnline");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data.usuariosConectados);
        setUsuariosConectados(data.usuariosConectados);
      } catch (error) {
        console.error("Error fetching user online data:", error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 3000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    console.log('Updated usuariosConectados:', usuariosConectados);
  }, [usuariosConectados]);

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:3000');

    newSocket.onopen = () => {
      console.log('WebSocket Client Connected');
    };

    newSocket.onmessage = (message) => {
      const data = JSON.parse(message.data);
      if (data.type === 'init') {
        setSillas(data.sillas);
      } else if (data.type === 'update') {
        setSillas(data.sillas);
      }
    };

    newSocket.onclose = () => {
      console.log('WebSocket Client Disconnected');
    };

    newSocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const obtenerNuevaNotification = async () => {
    try {
      const resp = await fetch("http://localhost:3000/api/sillasVendidas");
      if (!resp.ok) {
        throw new Error('Network response was not ok');
      }
      const json = await resp.json();
      setSillasVendidas(json.sillasVendidas);

      obtenerNuevaNotification();
    } catch (error) {
      console.error("Error fetching sillas vendidas:", error);
      setTimeout(obtenerNuevaNotification, 1000);
    }
  };

  useEffect(() => {
    obtenerNuevaNotification();
  }, []);

  const handleCompra = (infoCompra) => {
    const { type, id } = infoCompra;
    const data = JSON.stringify({ type, id });
    socket.send(data);
  };

  return (
    <div className="h-screen p-4">
      <div className="flex mb-10 text-center">
        <div className="w-1/2">
          <h1 className="text-3xl font-bold">Clientes en linea: {usuariosConectados}</h1>
        </div>
        <div className="w-1/2">
          <h1 className="text-3xl font-bold">Boletos vendidos: {sillasVendidas}</h1>
        </div>
      </div>
      <div className="curved-screen"></div>
      <div className="mt-8 flex justify-center">
        <div className="grid grid-cols-4 gap-y-10 gap-x-20">
          {sillas.map((silla) => (
            <Silla
              key={silla.id}
              id={silla.id}
              comprado={silla.comprado}
              onCompra={handleCompra}
            />
          ))}
        </div> 
      </div>
    </div>
  );
}

export default App;
