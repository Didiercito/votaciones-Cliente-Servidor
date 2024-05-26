import React, { useState } from 'react';
import './Grafica.css';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const [totalVotes, setTotalVotes] = useState(0); // Estado para almacenar el total de votos

  const data = {
    labels: ['Maynes', 'Xochilt', 'Claudia'],
    datasets: [
      {
        label: 'Nombres',
        data: [5, 10, 15],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(75, 192, 192, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Gráfica de Barras de Nombres',
      },
    },
  };

  // Función para calcular el total de votos
  const calculateTotalVotes = () => {
    const { datasets } = data;
    let total = 0;
    datasets.forEach(dataset => {
      dataset.data.forEach(votes => {
        total += votes;
      });
    });
    return total;
  };

  // Actualizar el estado del total de votos
  const updateTotalVotes = () => {
    const total = calculateTotalVotes();
    setTotalVotes(total);
  };

  // Llamar a la función para calcular el total de votos cuando el componente se monta
  React.useEffect(() => {
    updateTotalVotes();
  }, []);

  return (
    <div>
      <Bar data={data} options={options} />
      <button className="button" onClick={updateTotalVotes}>Actualizar</button>
      <p>Total de votos en general: {totalVotes}</p>
    </div>
  );
};

export default BarChart;
