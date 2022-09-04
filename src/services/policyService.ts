import api, {setAccessToken} from '~/api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_HOST} from 'react-native-dotenv';
export const getPolicies = async (sort: string) => {
  const res = await api.get(`insurance_policies?sort=${sort}`);
  if (res.status == 200) {
    return res.data;
  } else {
    return Promise.reject({
      message: 'Fail to get list policy!',
    });
  }
};

export const getAnnualSum = async () => {
  try {
    const token: any = await AsyncStorage.getItem('dataToken');
    // console.log(JSON.parse(token).id_token);
    console.log(api.headers);
    const res = await api.get(`insurance_policies/annual_sum`);
    api.setHeader('Authorization', `Bearer ${JSON.parse(token).id_token}`);
    if (res.status == 200) {
      return res.data;
    } else {
      return Promise.reject({
        message: 'Fail to get annual sum!',
      });
    }
  } catch (e) {
    console.log(e.message);
  }
};

export const getFileName = (uri: string) => {
  const fileName: Array<string> = uri.split('/');
  return fileName[fileName.length - 1];
};

export const CreatePolicy = async (uris: Array<string>, company: string) => {
  console.log('createpolicy');
  const token: any = await AsyncStorage.getItem('dataToken');
  const formData = new FormData();
  formData.append('company', company);
  formData.append('image_type', 'policy');
  formData.append('insurance_image_file', {
    uri: uris[0],
    name: getFileName(uris[0]),
    type: 'image/jpg',
  });
  // api.setHeader('Authorization', `Bearer ${JSON.parse(token).id_token}`);

  const res: any = await api.post('insurance_policies', formData);
  console.log(res);

  const listPormise = [];

  for (let index = 1; index < uris.length; index++) {
    const uri = uris[index];
    const form = new FormData();
    form.append('image_type', 'policy');
    form.append('insurance_image_file', {
      uri: uri,
      name: getFileName(uri),
      type: 'image/jpg',
    });
    form.append('insurance_policy_id', res.data.id);
    const promise = api.patch('insurance_policies/images', form);
    listPormise.push(promise);
  }

  const resImage = await Promise.all(listPormise);
  console.log(resImage);

  // api.setHeader('Authorization', `Bearer ${JSON.parse(token).access_token}`);
  return res;
};

export const updateImagePolicy = async (uris: Array<string>, id: any) => {
  const token: any = await AsyncStorage.getItem('dataToken');
  // api.setHeader('Authorization', `Bearer ${JSON.parse(token).id_token}`);
  const listPormise = [];
  for (let index = 0; index < uris.length; index++) {
    const uri = uris[index];
    const form = new FormData();
    form.append('image_type', 'policy');
    form.append('insurance_image_file', {
      uri: uri,
      name: getFileName(uri),
      type: 'image/jpg',
    });
    form.append('insurance_policy_id', id);
    const promise = api.patch('insurance_policies/images', form);
    listPormise.push(promise);
  }
  const resImage = await Promise.all(listPormise);
  // api.setHeader('Authorization', `Bearer ${JSON.parse(token).access_token}`);
  console.log(resImage);
  return resImage;
};

export const getPolicyDetail = async (id: number) => {
  const res = await api.get(`insurance_policies/${id}/detail?need_bin=false`);
  console.log('DATA VE ROI ANH EM OI', res.status);
  if (res.status == 200) {
    return res.data;
  } else {
    return Promise.reject({
      message: 'Fail to get policy detail!',
    });
  }
};

export const getPolicyImages = async (id: number) => {

  const res = await api.get(`insurance_policies/${id}/detail?need_bin=true`);
  console.log('DATA VE ROI ANH EM OI', res.status);

  if (res.status == 200) {
    return res.data;
  } else {
    return Promise.reject({
      message: 'Can not get images!',
    });
  }
};

export const deletePolicyDetail = async (id: Number) => {
  try {
    const res = await api.delete(`insurance_policies/${id}`);
    if (res.status !== 400) {
      return res.data;
    } else {
      return Promise.reject({
        message: 'Fail to delete policy',
      });
    }
  } catch (e) {
    console.log(e.message);
  }
};

export const updatePolicy = async (
  policy_id: number,
  billing_phone: string,
  website: string,
) => {
  console.log({policy_id, billing_phone, website});
  const res = await api.patch(`insurance_policies/${policy_id}`, {
    billing_phone: billing_phone,
    website: website,
  });
  if (res.status == 200) {
    return res.data;
  } else {
    return Promise.reject({
      message: 'Fail to get list policy!',
    });
  }
};

function compare(a: IPolicyInfo, b: IPolicyInfo) {
  if (a.id < b.id) {
    return -1;
  }
  if (a.id > b.id) {
    return 1;
  }
  return 0;
}

const convertObject = (obj: IPolicyInfo) => {
  return {
    id: obj.id,
    status: obj.status,
  };
};

export const checkListPolicy = (
  oldList: Array<IPolicyInfo>,
  newList: Array<IPolicyInfo>,
) => {
  const filterOldList = oldList.filter(item => {
    return item.status == 'done';
  });
  const filterNewList = newList.filter(item => {
    return item.status == 'done';
  });
  if (oldList.length == 0) {
    return false;
  } else if (filterOldList.length < filterNewList.length) {
    return true;
  } else if (filterOldList.length == filterNewList.length) {
    filterNewList.sort(compare);
    filterOldList.sort(compare);
    const convertOld = filterOldList.map(item => {
      return convertObject(item);
    });
    const convertNew = filterNewList.map(item => {
      return convertObject(item);
    });
    if (JSON.stringify(convertNew) == JSON.stringify(convertOld)) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
};
