import {create} from 'apisauce';
import {API_HOST} from 'react-native-dotenv';
import AsyncStorage from '@react-native-async-storage/async-storage';
console.log('host', API_HOST);
import NavigationService from '~/utils/NavigationService';
const api = create({
  baseURL: `${API_HOST}`,
});
export function setAccessToken(token: string) {
  api.setHeader('Authorization', `Bearer ${token}`);
}
export function deleteAccessToken() {
  api.deleteHeader('Authorization');
}

api.axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    console.log('DA VAO INTERCEPTOR');

    const {config: oldRequest} = error.response;
    if(error.response.status == 400 && oldRequest.url == 'users/refresh_token'){
      NavigationService.replace('Selection')
      await AsyncStorage.removeItem('dataToken');
      deleteAccessToken()
    }
    else if (error.response.status == 401) {
      const token: any = await AsyncStorage.getItem('dataToken');
      const data: any = await api.post('users/refresh_token', {
        refresh_token: JSON.parse(token).refresh_token,
      });
      oldRequest.headers['Authorization'] = 'Bearer ' + data.data.id_token;
      setAccessToken(data.data.id_token);
      await AsyncStorage.setItem('dataToken', JSON.stringify(data.data));
      if (oldRequest.url == 'users/verify_updated_code') {
        oldRequest.data['access_token'] = data.data.access_token;
        const newData = await api.axiosInstance.request(oldRequest);
        return newData;
      } else {
        const newData = await api.axiosInstance.request(oldRequest);
        return newData;
      }
    }
    //  else if (
    //   (oldRequest.url == 'insurance_policies' && oldRequest.method == 'post') ||
    //   oldRequest.url == 'insurance_policies/images' ||
    //   oldRequest.url.includes('insurance_share')
    // ) {
    //   const token: any = await AsyncStorage.getItem('dataToken');
    //   const data: any = await api.post('users/refresh_token', {
    //     refresh_token: JSON.parse(token).refresh_token,
    //   });
    //   oldRequest.headers['Authorization'] = 'Bearer ' + data.data.id_token;
    //   setAccessToken(data.data.id_token);
    //   await AsyncStorage.setItem('dataToken', JSON.stringify(data.data));
    //   if (oldRequest.url == 'users/verify_updated_code') {
    //     oldRequest.data['access_token'] = data.data.access_token;
    //     const newData = await api.axiosInstance.request(oldRequest);
    //     return newData;
    //   }
    //   const newData = await api.axiosInstance.request(oldRequest);
    //   return newData;
    // }
    // else if (
    //   (oldRequest.url == 'insurance_policies' && oldRequest.method == 'post') ||
    //   oldRequest.url == 'insurance_policies/images' ||
    //   oldRequest.url.includes('insurance_share')
    // ) {
    //   const token:any = await AsyncStorage.getItem('dataToken');
    //   const data:any = await api.post('users/refresh_token', {
    //     refresh_token: JSON.parse(token).refresh_token,
    //   });
    //   oldRequest.headers['Authorization'] = 'Bearer ' + data.data.id_token;
    //   setAccessToken(data.data.id_token);
    //   await AsyncStorage.setItem('dataToken', JSON.stringify(data.data));
    //   const newData = await api.axiosInstance.request(oldRequest);
    //   return newData;
    //   // return Promise.reject({
    //   //   error: error.response,
    //   // });
    // }
    else {
      return Promise.reject({
        error: error.response,
      });
    }
  },
);

export default api;
