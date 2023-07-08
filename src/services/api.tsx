import axios from "axios";

const getToken = async () => {
    const token = sessionStorage.getItem("token")
    return token
}

const api = axios.create({
    // baseURL: 'https://note-api-4ya6.onrender.com'
    baseURL: 'http://localhost:5400',
});

api.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;