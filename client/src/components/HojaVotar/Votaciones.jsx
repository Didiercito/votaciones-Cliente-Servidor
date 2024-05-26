import React from 'react';
import './Votaciones.css';

function Votaciones() {
  return (
    <div className="boleta">
      <h1>PROCESO ELECTORAL LOCAL 2023</h1>
      <h2>GUBERNATURA</h2>
      <div className="encabezado">
        <div className="elemento-encabezado">
          <span>ENTIDAD FEDERATIVA</span>
        </div>
        <div className="elemento-encabezado">
          <span>DISTRITO ELECTORAL</span>
        </div>
        <div className="elemento-encabezado">
          <span>MUNICIPIO</span>
        </div>
      </div>
      <p>Marque el recuadro de su preferencia</p>
      <div className="partidos">
        <div className="partido">
          <div className="logo-partido pan"></div>
          <span className="nombre-partido">PARTIDO ACCIÓN NACIONAL</span>
          <span className="nombre-candidato">Xóchitl Gálvez</span>
          <input type="checkbox" className="checkbox" />
        </div>
        <div className="partido">
          <div className="logo-partido pri"></div>
          <span className="nombre-partido">PARTIDO REVOLUCIONARIO INSTITUCIONAL</span>
          <span className="nombre-candidato">Xóchitl Gálvez</span>
          <input type="checkbox" className="checkbox" />
        </div>
        <div className="partido">
          <div className="logo-partido prd"></div>
          <span className="nombre-partido">PARTIDO DE LA REVOLUCIÓN DEMOCRÁTICA</span>
          <span className="nombre-candidato">Xóchitl Gálvez</span>
          <input type="checkbox" className="checkbox" />
        </div>
        <div className="partido">
          <div className="logo-partido pt"></div>
          <span className="nombre-partido">PARTIDO DEL TRABAJO</span>
          <span className="nombre-candidato">Claudia Sheinbaum</span>
          <input type="checkbox" className="checkbox" />
        </div>
        <div className="partido">
          <div className="logo-partido verde"></div>
          <span className="nombre-partido">PARTIDO VERDE ECOLOGISTA DE MÉXICO</span>
          <span className="nombre-candidato">Claudia Sheinbaum</span>
          <input type="checkbox" className="checkbox" />
        </div>
        <div className="partido">
          <div className="logo-partido udc"></div>
          <span className="nombre-partido">Movimiento Ciudadano</span>
          <span className="nombre-candidato">Jorge Álvarez Máynez</span>
          <input type="checkbox" className="checkbox" />
        </div>
        <div className="partido">
          <div className="logo-partido morena"></div>
          <span className="nombre-partido">MORENA</span>
          <span className="nombre-candidato">Claudia Sheinbaum</span>
          <input type="checkbox" className="checkbox" />
        </div>
      </div>
    </div>
  );
}

export default Votaciones;
