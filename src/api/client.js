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

export const update = async (clientUpdateRequest, authToken) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/update`, clientUpdateRequest, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });
    console.log('Client başarıyla güncellendi');
    return response;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Client güncellenirken bir hata oluştu.';
    console.error('Client güncellenirken hata oluştu:', errorMessage);
    throw new Error(errorMessage);
  }
};
