import React from 'react';
import StatisticsChart from '../../components/Graphics/StatisticsChart';
import PerformanceChart from '../../components/Graphics/PerformanceChart';
import Nav from "../../components/Nav/Index.jsx";
import './StatisticsPage.css'; // Archivo de estilos
import Footer from "../../components/Footer/index.jsx";


const StatisticsPage = () => {
  return (
    <div>
      <Nav />
      <h1>Estadísticas del Sistema Escolar</h1>
      <div className="charts-container">
        <StatisticsChart />
        <PerformanceChart />
      </div>
      <Footer />
    </div>
  );
};

export default StatisticsPage;
