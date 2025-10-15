import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// API methods
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getCurrentUser: () => api.get('/auth/me')
};

export const portfolioAPI = {
  getPortfolio: (clientId) => api.get(`/portfolio/${clientId}`),
  getHoldings: (clientId) => api.get(`/portfolio/${clientId}/holdings`)
};

export const transactionAPI = {
  getTransactions: (clientId) => api.get(`/transactions/${clientId}`),
  createPurchase: (data) => api.post('/transactions/purchase', data),
  createSIP: (data) => api.post('/transactions/sip/create', data)
};

export const schemeAPI = {
  getAllSchemes: () => api.get('/schemes'),
  getSchemeById: (id) => api.get(`/schemes/${id}`)
};

export default api;
