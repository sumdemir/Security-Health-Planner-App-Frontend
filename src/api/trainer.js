import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1/trainer';

export const getAllTrainers = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/getAllTrainers`);
        return response.data;
    } catch (error) {
        console.error('Antrenörler alınırken hata oluştu:', error.response?.data || error.message);
        throw new Error(error.response?.data || 'Antrenörler alınırken bir hata oluştu.');
    }
    }