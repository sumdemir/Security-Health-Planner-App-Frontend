import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/mealCalorie';

export const saveMealCalorie = async (mealCaloriesDTO) => {
  try {
    // LocalStorage'dan clientId'yi al
    const clientId = localStorage.getItem('bitirmeuserid');
    if (!clientId) {
      throw new Error('Client ID not found in localStorage.');
    }

    console.log('Client ID:', clientId);
    console.log('Meal Calorie Data:', mealCaloriesDTO);

    const mealCaloriesRequest = {
      clientId: parseInt(clientId), // clientId'yi integer'a çeviriyoruz
      mealCaloriesDTO: {
        name: mealCaloriesDTO.name,
        fatTotalG: parseFloat(mealCaloriesDTO.fatTotalG), // Sayı olarak gönderiyoruz
        carbohydratesTotalG: parseFloat(mealCaloriesDTO.carbohydratesTotalG), // Sayı olarak gönderiyoruz
        sodiumMg: parseFloat(mealCaloriesDTO.sodiumMg), // Sayı olarak gönderiyoruz
        potassiumMg: parseFloat(mealCaloriesDTO.potassiumMg), // Sayı olarak gönderiyoruz
        cholesterolMg: parseFloat(mealCaloriesDTO.cholesterolMg), // Sayı olarak gönderiyoruz
        fiberG: parseFloat(mealCaloriesDTO.fiberG), // Sayı olarak gönderiyoruz
        sugarG: parseFloat(mealCaloriesDTO.sugarG), // Sayı olarak gönderiyoruz
        createdAt: new Date().toISOString(), // Güncel tarih gönderiyoruz (isteğe bağlı)
        calories: mealCaloriesDTO.calories, // String olarak
        servingSizeG: mealCaloriesDTO.servingSizeG, // String olarak
        proteinG: mealCaloriesDTO.proteinG, // String olarak
      }
    };

    // API isteğini gönderiyoruz
    const response = await axios.post(`${API_BASE_URL}/saveMealCaloriesDTO`, mealCaloriesRequest);

    console.log('Response from server:', response.data);

    return response.data;
  } catch (error) {
    console.error('Error saving meal calorie:', error);
    throw error;
  }
};
