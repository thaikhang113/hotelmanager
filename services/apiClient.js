const axios = require('axios');
require('dotenv').config();

const API_BASE = process.env.API_BASE || "http://217.216.72.223:3000";

const apiClient = axios.create({
    baseURL: API_BASE,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

const MAX_PAYLOAD_SIZE = 5 * 1024 * 1024;
const MAX_TOKEN_LENGTH = 2048;

apiClient.interceptors.request.use(config => {
    if (config.data) {
        const payloadSize = JSON.stringify(config.data).length;
        if (payloadSize > MAX_PAYLOAD_SIZE) {
            throw new Error('Payload too large. Maximum allowed is 5MB.');
        }
    }
    return config;
}, error => {
    return Promise.reject(error);
});

const attachToken = (req) => {
    const token = req.cookies ? req.cookies.token : null;
    if (token) {
        if (token.length > MAX_TOKEN_LENGTH) {
            console.error('Token overflow detected');
            return {}; 
        }
        return { Authorization: `Bearer ${token}` };
    }
    return {};
};

module.exports = {
    get: (url, req) => apiClient.get(url, { headers: attachToken(req) }),
    post: (url, data, req) => apiClient.post(url, data, { headers: attachToken(req) }),
    put: (url, data, req) => apiClient.put(url, data, { headers: attachToken(req) }),
    delete: (url, req) => apiClient.delete(url, { headers: attachToken(req) }),
    instance: apiClient
};