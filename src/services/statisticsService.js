// src/services/statisticsService.js

import axios from 'axios';
import { ENV } from '../utils/constants';
import { storageController } from './token'; // Ajusta la ruta según la ubicación real

export const fetchStatistics = async () => {
  try {
    const token = storageController.getToken();
    const response = await axios.get(`${ENV.API_URL}${ENV.ENDPOINTS.STATISTICS}`, {
      headers: {
        'x-access-token': token
      }
    });
    return response.data;
  } catch (e) {
    console.error('Error fetching statistics:', e);
    throw e;
  }
};

export const fetchPerformanceData = async () => {
  try {
    const token = storageController.getToken();
    const response = await axios.get(`${ENV.API_URL}${ENV.ENDPOINTS.STATISTICSREPROBADOS}`, {
      headers: {
        'x-access-token': token
      }
    });
    return response.data;
  } catch (e) {
    console.error('Error fetching statistics:', e);
    throw e;
  }
};
