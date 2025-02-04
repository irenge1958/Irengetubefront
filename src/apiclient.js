import axios from 'axios';

// Create a new instance of Axios
const apiClient = axios.create({
    baseURL:"https://irengetube.vercel.app/", // Global base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;
