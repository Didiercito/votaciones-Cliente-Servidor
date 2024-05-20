// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registro from './components/Registro/Registro';
import InicioDeSesion from './components/InicioDeSesión/InicioDeSesion';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<InicioDeSesion />} />
                <Route path="/registro" element={<Registro />} />
            </Routes>
        </Router>
    );
}

export default App;
