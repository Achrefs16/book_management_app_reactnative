import { API_BASE_URL } from './apiConfig';
import axios from 'axios';

const handleApiError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error('API Error Response:', error.response.data);
    throw new Error(error.response.data.message || 'API request failed');
  } else if (error.request) {
    // The request was made but no response was received
    console.error('API Error Request:', error.request);
    throw new Error('No response from server. Please check your connection.');
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('API Error:', error.message);
    throw new Error('Failed to make request');
  }
};

export const getAllBooks = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/books`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.data || !Array.isArray(response.data.data)) {
      throw new Error('Invalid response format');
    }
    return response.data.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getBookById = async (id, token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/books/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.data || !response.data.data) {
      throw new Error('Invalid response format');
    }
    return response.data.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const createBook = async (book, token) => {
  try {
    console.log('Creating book with data:', book);
    const response = await axios.post(`${API_BASE_URL}/books`, book, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('Create book response:', response.data);
    if (!response.data || !response.data.data) {
      throw new Error('Invalid response format');
    }
    return response.data.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateBook = async (id, book, token) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/books/${id}`, book, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (!response.data || !response.data.data) {
      throw new Error('Invalid response format');
    }
    return response.data.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteBook = async (id, token) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/books/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.data || typeof response.data.success !== 'boolean') {
      throw new Error('Invalid response format');
    }
    return response.data.success;
  } catch (error) {
    handleApiError(error);
  }
}; 