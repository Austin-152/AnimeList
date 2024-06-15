// api.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('token') || '';
};

// Function to search anime
export const searchAnime = (query) => {
  if (typeof query !== 'string') {
    return Promise.reject(new Error('Query must be a string'));
  }

  const queryData = { query, type: "anime" };
  const headers = {
    'Authorization': `Bearer ${getAuthToken()}`,
  };

  return instance.post('/search', queryData, { headers })
    .then(response => response.data)
    .catch(error => {
      console.error('Error searching for anime:', error);
      return Promise.reject(new Error('Failed to search for anime'));
    });
};

// Function to get trending anime
export const getTrendingAnime = () => {
  const headers = {
    'Authorization': `Bearer ${getAuthToken()}`,
  };

  return instance.get('/getTrending', { headers })
    .then(response => response.data)
    .catch(error => {
      console.error('Error getting trending anime:', error);
      return Promise.reject(new Error('Failed to get trending anime'));
    });
};

// Function to get user's recently added likes
export const getUserRecentlyAdded = () => {
  const headers = {
    'Authorization': `Bearer ${getAuthToken()}`,
  };

  return instance.get('/getUserRecentlyAdd', { headers })
    .then(response => response.data)
    .catch(error => {
      console.error('Error getting user\'s recently added:', error);
      return Promise.reject(new Error('Failed to get user\'s recently added'));
    });
};

// Function to check login status
export const checkLogin = () => {
  const headers = {
    'Authorization': `Bearer ${getAuthToken()}`,
  };

  return instance.get('/checkLogin', { headers })
    .then(response => response.data)
    .catch(error => {
      console.error('Error checking login status:', error);
      return Promise.reject(new Error('Failed to check login status'));
    });
};

// Function to get user subscriptions
export const getUserSubscriptions = () => {
  const headers = {
    'Authorization': `Bearer ${getAuthToken()}`,
  };

  return instance.get('/getUserSubscriptions', { headers })
    .then(response => response.data)
    .catch(error => {
      console.error('Error getting user subscriptions:', error);
      return Promise.reject(new Error('Failed to get user subscriptions'));
    });
};
