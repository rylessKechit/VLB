import axios from 'axios';

// Créer une instance axios avec une configuration de base
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Intercepteur pour ajouter le token aux requêtes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs de réponse
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Gérer les erreurs d'authentification (token expiré, etc.)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Services d'authentification
export const authService = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
  logout: () => {
    localStorage.removeItem('token');
    return api.get('/auth/logout');
  },
  updatePassword: (passwordData) => api.put('/auth/updatepassword', passwordData)
};

// Services de réservation
export const bookingService = {
  calculatePrice: (bookingData) => api.post('/bookings/calculate-price', bookingData),
  createBooking: (bookingData) => api.post('/bookings', bookingData),
  getBookings: () => api.get('/bookings'),
  getBookingById: (id) => api.get(`/bookings/${id}`),
  updateBookingStatus: (id, status) => api.put(`/bookings/${id}/status`, { status }),
  cancelBooking: (id) => api.put(`/bookings/${id}/cancel`)
};

// Services utilisateur (pour l'administration)
export const userService = {
  getUsers: () => api.get('/users'),
  getUser: (id) => api.get(`/users/${id}`),
  updateUser: (id, userData) => api.put(`/users/${id}`, userData),
  deleteUser: (id) => api.delete(`/users/${id}`)
};

export default api;