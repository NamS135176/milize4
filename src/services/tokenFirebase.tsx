import api from '~/api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const postTokenFirebase = async (token: string) => {
  try {
    const res = await api.post('firebase', {
      token,
    });
    console.log('status token', res.status);
    if (res.status === 201) {
      console.log('new token');
      return res.data;
    } else {
      return Promise.reject({
        message: 'Fail to post token',
      });
    }
  } catch (e) {
    console.log(e.message);
  }
};

export const patchTokenFirebase = async (token: string) => {
  try {
    const res = await api.patch('firebase', {
      token,
    });
    if (res.status === 204) {
      console.log('delete token');
      await AsyncStorage.removeItem('@fcm_token');
      return res.data;
    } else {
      return Promise.reject({
        message: 'Fail to patch token',
      });
    }
  } catch (e) {
    console.log(e.message);
  }
};
