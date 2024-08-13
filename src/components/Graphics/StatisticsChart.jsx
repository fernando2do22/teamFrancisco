// src/components/StatisticsChart.jsx


import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { fetchStatistics } from '../../services/statisticsService';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './estilos.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StatisticsChart = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const getStatistics = async () => {
      try {
        const fetchedData = await fetchStatistics();

        // Transform the data
        const labels = fetchedData.map(item => `${item.alumno.name} ${item.alumno.lastname}`);
        const values = fetchedData.map(item => item.count);

        const chartData = {
          labels: labels,
          datasets: [
            {
              label: 'Número de Registros',
              data: values,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            }
          ]
        };
        setData(chartData);
      } catch (error) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };
    
    getStatistics();
  }, []);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="chart-container">
      <h2>Alumnos más reprobados </h2>
      <div className="chart">
        <Bar data={data} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
      </div>
    </div>
  );
};



export default StatisticsChart;
