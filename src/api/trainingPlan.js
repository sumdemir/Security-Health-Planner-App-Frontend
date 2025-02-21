import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/trainingplan';

export const getTrainingPlanChat = async (clientId, trainerId) => {
  try {
    const bitirmeuserid = parseInt(localStorage.getItem('bitirmeuserid'), 10);
    if (!clientId || !trainerId) {
      throw new Error('Kullanıcı ID\'si veya Antrenör ID\'si eksik.');
    }

    const response = await axios.post(`${API_BASE_URL}/getTrainingPlanDTO`, {
      clientId: bitirmeuserid,
      trainerId: trainerId,
    });

    return response.data;
  } catch (error) {
    console.error('Spor planı alınırken hata oluştu:', error.response?.data || error.message);
    throw new Error(error.response?.data || 'Spor planı alınırken bir hata oluştu.');
  }
};

export const getAllTrainingPlansForUser = async () => {
  try {
    const bitirmeuserid = parseInt(localStorage.getItem('bitirmeuserid'), 10);
    if (!bitirmeuserid) {
      throw new Error('Kullanıcı ID\'si eksik.');
    }

    const response = await axios.get(`${API_BASE_URL}/getAllTrainingPlansForUser`, {
      params: { clientId: bitirmeuserid },
    });

    return response.data;
  } catch (error) {
    console.error('Diyet planları alınırken hata oluştu:', error.response?.data || error.message);
    throw new Error(error.response?.data || 'Diyet planları alınırken bir hata oluştu.');
  }
};
