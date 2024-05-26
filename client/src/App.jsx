import React from 'react';
import Votaciones from './components/HojaVotar/Votaciones';
import Grafica from './components/Grafica/Grafica';
import './components/HojaVotar/Votaciones.css';

function App() {
  return (
    <div className="container">
      <div className="chart-container">
        <Grafica />
      </div>
      <div className="boleta-container">
        <Votaciones />
      </div>
    </div>
  );
}

export default App;
