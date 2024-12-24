import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1/client';

/**
 * Client bilgilerini güncellemek için backend'e PUT isteği gönderir.
 * @param {Object} clientData - Güncellenecek client bilgileri
 * @param {string} authToken - Kullanıcı token'ı
 * @param {integer} userId - Kullanıcının id'si (AuthContext'ten alınacak)
 * @returns {Promise<Object>} Güncelleme işlemi sonucu dönen response verisi
 * @throws {Error} İstek sırasında oluşan hataları bildirir
 */
export const update = async (clientData, authToken, userId) => {
  try {
    // clientData ile userId'yi birleştirerek payload oluşturuyoruz
    const payload = {
      ...clientData,   // mevcut clientData bilgileri
      userId: userId   // userId'yi ekliyoruz
    };

    const response = await axios.put(
      `${API_BASE_URL}/update`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,  // Kullanıcı token'ı
        },
      }
    );
    console.log('Client başarıyla güncellendi:', response.data);
    return response.data;  // Güncellenen client bilgilerini döndürür
  } catch (error) {
    // Eğer error.response mevcutsa, hatayı burada belirtebiliriz. Aksi takdirde error.message ile
    const errorMessage = error.response?.data || error.message || 'Client güncellenirken bir hata oluştu.';
    console.error('Client güncellenirken hata oluştu:', errorMessage);
    throw new Error(errorMessage);  // Hata mesajını döndürür
  }
};
