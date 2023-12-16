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

interface ActionRequestBody {
  actionType: string;
}

export const actOnSpectrum = async (body: ActionRequestBody) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/ActOnSpectrum`, body);
    return response.data;
  } catch (error) {
    console.error('Error performing action:', error);
    throw error;
  }
};