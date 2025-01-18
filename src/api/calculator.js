import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/api/mealCalorie';

export const saveMealCalorie = async (mealCaloriesDTO, clientId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/saveMealCaloriesDTO`, {
        clientId: clientId,
        mealCaloriesDTO: mealCaloriesDTO,
      });
      return response.data;
    } catch (error) {
      console.error("Error saving meal calorie:", error);
      throw error;
    }
  };