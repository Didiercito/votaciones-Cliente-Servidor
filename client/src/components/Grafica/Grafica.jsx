import React from 'react';
import './Grafica.css';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data, options }) => {
  return (
    <div className="chart-container">
      <h1 className="chart-title">Gráfica de Barras</h1>
      <Bar data={data} options={options} className="chart" />
    </div>
  );
};

export default BarChart;
