import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ConfirmAlert from '../Alerta/Alerta';
import BarChart from '../Grafica/Grafica';
import './Votaciones.css';

function Votaciones() {
  const [candidates, setCandidates] = useState([]);
  const [selectedParty, setSelectedParty] = useState(null);
  const location = useLocation();
  const userId = location.state?.userId || localStorage.getItem('userId');
  const userState = location.state?.userState || localStorage.getItem('userState');  
  const userCity = location.state?.userCity || localStorage.getItem('userCity');    
  const [ws, setWs] = useState(null);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Votos',
      data: [],
      backgroundColor: [],
      borderColor: [],
      borderWidth: 1,
    }]
  });

  const obtenerCandidatos = () => {
    fetch('http://localhost:8080/api/v1/candidate/all')
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setCandidates(data.candidates);
          updateChartData(data.candidates);
        } else {
          console.error('Failed to retrieve candidates');
        }
      })
      .catch(error => {
        console.error('Error fetching candidates:', error);
      });
  };

  const updateChartData = (candidates) => {
    const labels = candidates.map(candidate => candidate.name_candidate);
    const votes = candidates.map(candidate => candidate.votes);
    const backgroundColor = candidates.map((_, index) => `rgba(${index * 50}, ${index * 50}, ${index * 50}, 0.2)`);
    const borderColor = candidates.map((_, index) => `rgba(${index * 50}, ${index * 50}, ${index * 50}, 1)`);

    setChartData({
      labels,
      datasets: [{
        label: 'Votos',
        data: votes,
        backgroundColor,
        borderColor,
        borderWidth: 1,
      }]
    });
  };

  useEffect(() => {
    obtenerCandidatos(); 
    const intervalId = setInterval(obtenerCandidatos, 5000); 
    return () => clearInterval(intervalId); 
  }, []);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');
    setWs(socket);

    socket.onopen = () => {
      console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.event === 'vote') {
        obtenerCandidatos();
      }
    };

    socket.onclose = () => {
      console.log('WebSocket closed');
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => socket.close();
  }, []);

  const handleCheckboxChange = (candidate) => {
    setSelectedParty(candidate.candidate_id); 
  };

  const handleVote = (event) => {
    event.preventDefault();
    if (selectedParty) {
      ConfirmAlert({
        title: 'Confirmar su voto',
        message: `Estas seguro que quieres votar por este partido politico?`,
        onConfirm: () => {
          thankYouAlert();
        },
        onCancel: () => {
        }
      });
    }
  };

  const thankYouAlert = () => {
    alert('Thank you for your vote!');

    const voteData = {
      candidateId: selectedParty
    };

    fetch(`http://localhost:8080/api/v1/vote/vote/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(voteData)
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        console.log('Voto registrado exitosamente');
        obtenerCandidatos(); 
      } else {
        console.error('Error al registrar el voto');
      }
    })
    .catch(error => {
      console.error('Error al enviar el voto:', error);
    });
  };

  return (
    <div className="votaciones-container">
      <div className="grafica">
        <BarChart data={chartData} options={{ responsive: true }} />
      </div>
      <div className="boleta-container">
        <form action="" className='boleta' onSubmit={handleVote}>
          <h1>PROCESO ELECTORAL LOCAL 2023</h1>
          <h2>GUBERNATURA</h2>
          <div className="encabezado">
            <div className="elemento-encabezado">
              <span>ENTIDAD FEDERATIVA</span>
              <span>{userState}</span>
            </div>
            <div className="elemento-encabezado">
              <span>DISTRITO ELECTORAL</span>
            </div>
            <div className="elemento-encabezado">
              <span>MUNICIPIO</span>
              <span>{userCity}</span> 
            </div>
          </div>
          <p>Marque el recuadro de su preferencia</p>
          <div className="partidos">
            {candidates.map(candidate => (
              <div key={candidate._id} className="partido">
                <div className="logo-partido">
                  <img src={candidate.image_url} alt={candidate.name_political_party} className="logo" />
                </div>
                <span className="nombre-partido">{candidate.name_political_party}</span>
                <span className="nombre-candidato">{candidate.name_candidate}</span>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={selectedParty === candidate.candidate_id}
                  onChange={() => handleCheckboxChange(candidate)}
                />
              </div>
            ))}
          </div>
          <div className="button-container">
            <button type="submit" disabled={!selectedParty}>Votar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Votaciones;
