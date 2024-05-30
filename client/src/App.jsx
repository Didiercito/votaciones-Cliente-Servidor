import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Inicio from './components/InicioDeSesión/InicioDeSesion';
import Registro from './components/Registro/registro';
import Votaciones from './components/HojaVotar/Votaciones';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/registro" element={<Registro />} /> 
        <Route path="/votaciones" element={<Votaciones />} /> 
      </Routes>
    </Router>
  );
}

export default App;
