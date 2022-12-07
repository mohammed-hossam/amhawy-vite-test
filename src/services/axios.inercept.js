import axios from 'axios';

const axiosApiInstance = axios.create({
  baseURL: 'https://us-central1-takweed-eg.cloudfunctions.net',
  // baseURL: process.env.REACT_APP_BASE_URL,
  // baseURL: 'http://localhost:3002',
});
// console.log(process.env.BASE_URL);
// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async (config) => {
    // const value = await redisClient.get(rediskey)
    // const keys = JSON.parse(value)
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      Accept: 'application/json',
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      window.location.replace('/login');
    }
    return Promise.reject(error);
  }
);

export default axiosApiInstance;
