import axios from 'axios';
export const API_URL = process.env.REACT_APP_API_URL;

// Création d'une instance axois avec la bonne URL de base
// Ici nous utilisons explicitement le port 4000 où le serveur backend s'exécute
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Ajouter un intercepteur de requête pour ajouter le token d'authentification si nécessaire
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

// Ajouter un intercepteur de réponse pour gérer les erreurs globalement
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Afficher les détails de l'erreur dans la console pour le débogage
    console.error('API Error:', error.response?.data || error.message);
    
    // Gérer les erreurs d'authentification
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      // La logique de redirection pourrait être ajoutée ici
    }
    
    return Promise.reject(error);
  }
);

// Services API
export const bookingService = {
  createBooking: (bookingData) => api.post('/bookings', bookingData),
  getBookingById: (id) => api.get(`/bookings/${id}`),
  cancelBooking: (id, data) => api.delete(`/bookings/${id}`, { data }),
};

export const priceService = {
  calculateEstimate: (routeData) => api.post('/price/estimate', routeData),
};

export const contactService = {
  sendMessage: (messageData) => api.post('/contact', messageData),
};

export const authService = {
  register: (userData) => api.post('/users/register', userData),
  login: (credentials) => api.post('/users/login', credentials),
  getProfile: () => api.get('/users/profile'),
  updateProfile: (userData) => api.put('/users/profile', userData),
};

export default api;