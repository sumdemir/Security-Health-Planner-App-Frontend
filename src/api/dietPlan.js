import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/dietplan';

export const getDietPlanChat = async (clientId, dietitianId) => {
  try {
    const bitirmeuserid = parseInt(localStorage.getItem('bitirmeuserid'), 10);
    if (!clientId || !dietitianId) {
      throw new Error('Kullanıcı ID\'si veya Diyetisyen ID\'si eksik.');
    }
    
    const response = await axios.post(`${API_BASE_URL}/getDietPlanChat`, {
      clientId: bitirmeuserid, // Kullanıcının ID'si
      dietitianId: dietitianId, // Diyetisyen ID'si
    });
    
    return response.data;
  } catch (error) {
    console.error('Diyet planı alınırken hata oluştu:', error.response?.data || error.message);
    throw new Error(error.response?.data || 'Diyet planı alınırken bir hata oluştu.');
  }
};


