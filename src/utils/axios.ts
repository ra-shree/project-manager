import axios, { AxiosInstance } from 'axios';

axios.defaults.withCredentials = true;
const api: AxiosInstance = axios.create({
    baseURL: 'http://localhost',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
    },
});
export default api;
