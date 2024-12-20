import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/dietplan';


export const getDietPlan = async (clientId, dietitianId) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/getDietPlan`,
      null,
      {
        params: { clientId, dietitianId },
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Diyet planı alınırken hata oluştu:', error.response?.data || error.message);
    throw new Error(error.response?.data || 'Diyet planı alınırken bir hata oluştu.');
  }
};


