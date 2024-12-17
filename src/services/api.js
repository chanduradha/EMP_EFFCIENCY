import axios from 'axios';

const API_BASE_URL = 'http://localhost:8006';

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      username,
      password
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Login failed');
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Registration failed');
  }
};

// Department and Manager enums from backend
export const DEPARTMENTS = [
  'SMDDC', 'NMTC', 'POD', 
  'ACCOUNTS', 'SDC', 'IT'
];

export const MANAGERS = [
  'Richor', 'Devid', 'Henry', 
  'Kelvin', 'Ronaldo'
];