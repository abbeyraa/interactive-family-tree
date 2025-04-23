import axios from 'axios';

// Buat instance axios dengan konfigurasi dasar
const api = axios.create({
    baseURL: 'http://localhost:5000/api/family', // Sesuaikan dengan URL BE kamu
    timeout: 5000, // Timeout 5 detik
});

// Tambahkan interceptor untuk handle error global
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

export default api;