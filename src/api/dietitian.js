import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1/dietitian';

export const getAllDietitians = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/getAllDietitians`);
        return response.data;
    } catch (error) {
        console.error('Diyetisyenler alınırken hata oluştu:', error.response?.data || error.message);
        throw new Error(error.response?.data || 'Diyetisyenler alınırken bir hata oluştu.');
    }
    }