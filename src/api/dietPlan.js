import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/dietplan';

// export const getDietPlan = async (clientId, dietitianId) => {
//   try {
//     const response = await axios.post(
//       `${API_BASE_URL}/getDietPlan`,
//       null,
//       {
//         params: { clientId, dietitianId },
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error('Diyet planı alınırken hata oluştu:', error.response?.data || error.message);
//     throw new Error(error.response?.data || 'Diyet planı alınırken bir hata oluştu.');
//   }
// };


/**
 * getDietPlanChat
 * @param {integer} userId - Kullanıcının ID'si
 * @param {integer} clientId - Kullanıcının ID'si
 * @param {integer} dietitianId - Seçilen diyetisyenin ID'si
 * @returns {Promise<string>} - Backend'den dönen yanıt
 */
export const getDietPlanChat = async (userId, dietitianId) => {
  try {
    
      const bitirmeuserid = localStorage.getItem('bitirmeuserid');
      const response = await axios.post(`${API_BASE_URL}/getDietPlan`, {
      clientId: bitirmeuserid,
      dietitianId: dietitianId,
      
    });

    return response.data; // Backend'den dönen yanıt
  } catch (error) {
    console.error('Error fetching diet plan:', error);
    throw error;
  }
};


