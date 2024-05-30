import React from 'react';
import './Grafica.css';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data, options }) => {
  return (
    <div>
      <h1>Gráfica de Barras</h1>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
