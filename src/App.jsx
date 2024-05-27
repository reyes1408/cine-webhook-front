import { useState, useEffect } from "react";
import './App.css'; // Asegúrate de que la ruta sea correcta

function App() {
  const [usuariosConectados, setUsuariosConectados] = useState(0);

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

    const intervalId = setInterval(fetchData, 3000); // Realizar polling cada 3 segundos

    // Limpieza al desmontar el componente
    return () => clearInterval(intervalId);
  }, []);

  // Uso de useEffect para monitorear cambios en usuariosConectados
  useEffect(() => {
    console.log('Updated usuariosConectados:', usuariosConectados);
  }, [usuariosConectados]);

  return (
    <div className="h-screen p-4">
      <div className="flex mb-10 text-center">
        <div className="w-1/2">
          <h1 className="text-3xl font-bold">Clientes en linea: {usuariosConectados}</h1>
        </div>
        <div className="w-1/2">
          <h1 className="text-3xl font-bold">Boletos vendidos:</h1>
        </div>
      </div>
      <div className="curved-screen"></div>
      <div className="mt-8 flex justify-center">
        <div className="grid grid-cols-4 gap-y-10 gap-x-20">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="w-16 h-16 rounded-lg bg-gray-300"></div>
          ))}
        </div> 
      </div>
    </div>
  );
}

export default App;
