import api from '~/api/api';

export const getNotices = async () => {
  const res = await api.get('notices/'); //dont remove / on last
  if (res.status == 200) {
    return res.data;
  } else {
    return Promise.reject({
      message: 'Fail to get list notices!',
    });
  }
};

export const getNoticeDetail = async (id: number) => {
  const res = await api.get(`notices/${id}`);
  console.log(res);

  if (res.status == 200) {
    return res.data;
  } else {
    return Promise.reject({
      message: 'Fail to get notice detail!',
    });
  }
};
