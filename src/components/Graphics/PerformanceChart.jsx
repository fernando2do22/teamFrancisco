// src/components/Graphics/PerformanceChart.jsx

import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { fetchPerformanceData } from '../../services/statisticsService';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PerformanceChart = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPerformanceData = async () => {
      try {
        const fetchedData = await fetchPerformanceData();

        // Transformar los datos
        const labels = fetchedData.map(item => item.nombre);
        const promedioData = fetchedData.map(item => item.promedio);
        const maxData = fetchedData.map(item => item.maxCalificacion);
        const minData = fetchedData.map(item => item.minCalificacion);

        const chartData = {
          labels: labels,
          datasets: [
            {
              label: 'Promedio',
              data: promedioData,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
            {
              label: 'Calificación Máxima',
              data: maxData,
              backgroundColor: 'rgba(153, 102, 255, 0.6)',
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 1,
            },
            {
              label: 'Calificación Mínima',
              data: minData,
              backgroundColor: 'rgba(255, 159, 64, 0.6)',
              borderColor: 'rgba(255, 159, 64, 1)',
              borderWidth: 1,
            },
          ],
        };

        setData(chartData);
      } catch (error) {
        setError('Error al obtener los datos de rendimiento');
      } finally {
        setLoading(false);
      }
    };

    getPerformanceData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="chart-container">
      <h2>Desempeño del Alumno</h2>
      <div className="chart">
        <Bar data={data} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
      </div>
    </div>
  );
};

export default PerformanceChart;
