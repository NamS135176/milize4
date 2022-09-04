import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '~/api/api';

export const getRequest = async (id: number) => {
  const token: any = await AsyncStorage.getItem('dataToken');
  // api.setHeader('Authorization', `Bearer ${JSON.parse(token).id_token}`);
  const res = await api.get(
    `insurance_share/request?insurance_policy_id=${id}`,
  );
  // api.setHeader('Authorization', `Bearer ${JSON.parse(token).access_token}`);
  if (res.status == 200) {
    return res.data;
  } else {
    return Promise.reject({
      message: 'Fail to get share request',
    });
  }
};

export const getReceive = async () => {
  const token: any = await AsyncStorage.getItem('dataToken');
  // api.setHeader('Authorization', `Bearer ${JSON.parse(token).id_token}`);
  const res = await api.get(`insurance_share/receive`);
  // api.setHeader('Authorization', `Bearer ${JSON.parse(token).access_token}`);
  if (res.status == 200) {
    return res.data;
  } else {
    return Promise.reject({
      message: 'Fail to get share receive',
    });
  }
};

export const createRequest = async (id: number, email: string) => {
  const token: any = await AsyncStorage.getItem('dataToken');
  // api.setHeader('Authorization', `Bearer ${JSON.parse(token).id_token}`);
  const res = await api.post(`insurance_share/`, {
    insurance_policy_id: id,
    shared_email: email,
  });
  // console.log(res);

  // api.setHeader('Authorization', `Bearer ${JSON.parse(token).access_token}`);
  if (res.status == 201) {
    return res.data;
  } else {
    return Promise.reject({
      message: 'Fail to get share',
    });
  }
};

export const createListRequest = async (
  id: number,
  listRequest: Array<string>,
) => {
  const token: any = await AsyncStorage.getItem('dataToken');
  // api.setHeader('Authorization', `Bearer ${JSON.parse(token).id_token}`);
  console.log('list', listRequest);

  const listPromise = listRequest.map(item => {
    return api.post(`insurance_share/`, {
      insurance_policy_id: id,
      shared_email: item,
    });
  });
  const res = await Promise.all(listPromise)
  // api.setHeader('Authorization', `Bearer ${JSON.parse(token).access_token}`);
  return res
};

export const acceptRequest = async (insurance_policy_id:number, share_key:string, sharee_email:string, sharee_id:number) => {
  const token: any = await AsyncStorage.getItem('dataToken');
  // api.setHeader('Authorization', `Bearer ${JSON.parse(token).id_token}`);
  const res = await api.post('insurance_share/accept',{
      insurance_policy_id: insurance_policy_id,
      share_key: share_key,
      sharee_email: sharee_email,
      sharee_id: sharee_id   
  })
  // api.setHeader('Authorization', `Bearer ${JSON.parse(token).access_token}`);
  if (res.status == 201) {
    return res.data;
  } else {
    return Promise.reject({
      message: 'Fail to accept',
    });
  }
}

export const denyRequset = async (insurance_policy_id:number, share_key:string, sharee_email:string, sharee_id:number) => {
  const token: any = await AsyncStorage.getItem('dataToken');
  // api.setHeader('Authorization', `Bearer ${JSON.parse(token).id_token}`);
  const res = await api.post('insurance_share/deny',{
      insurance_policy_id: insurance_policy_id,
      share_key: share_key,
      sharee_email: sharee_email,
      sharee_id: sharee_id   
  })
  // api.setHeader('Authorization', `Bearer ${JSON.parse(token).access_token}`);
  if (res.status == 201) {
    return res.data;
  } else {
    return Promise.reject({
      message: 'Fail to deny',
    });
  }
}