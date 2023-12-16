import axios from 'axios';

const API_BASE_URL = 'https://webfrontendassignment-isaraerospace.azurewebsites.net/api';

export const fetchSpectrumStatus = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/SpectrumStatus`);
    return response.data;
  } catch (error) {
    console.error('Error fetching sensor data:', error);
    throw error;
  }
};

export const actOnSpectrum = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/ActOnSpectrum`);
    return response.data;
  } catch (error) {
    console.error('Error performing action:', error);
    throw error;
  }
};
