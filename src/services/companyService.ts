import api from '~/api/api';

export const getCompanies = async () => {
  const res = await api.get('companies');
  if (res.status == 200) {
    return res.data;
  } else {
    return Promise.reject({
      message: 'Fail to get company info!',
    });
  }
};
