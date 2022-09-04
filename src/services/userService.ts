import api from '~/api/api';

export const getUserInfoData = async (action: IActionToken) => {
  const data = await api.get('users/me');
  if (data.status == 200) {
    return data.data;
  } else {
    return Promise.reject({
      message: 'Fail to get user info!',
    });
  }
};

export const SignOut = async (email: string) => {
  const data = await api.post('users/sign_out');
  return data;
};

export const changePassword = async (
  access_token: string,
  current_password: string,
  new_password: string,
) => {
  const res = await api.post('users/change_password', {
    access_token: access_token,
    current_password: current_password,
    new_password: new_password,
  });
  return res;
};

export const changeMail = async (email: string) => {
  const res = await api.patch('users/change_email', {
    email: email,
  });
  if (res.status == 204) {
    return res;
  } else {
    return Promise.reject({
      messsage: 'Fail to  change email',
    });
  }
};

// export const verifyUpdate = async (verifyCode: string) => {
//   const token: any = await AsyncStorage.getItem('dataToken');
//   const res = await api.post('users/verify_updated_code', {
//     access_token: JSON.parse(token).access_token,
//     verify_code: verifyCode,
//   });
//   if (res.status == 204) {
//     return res;
//   } else {
//     return Promise.reject({
//       messsage: 'Fail to verify code',
//     });
//   }
// };

export const postInquiries = async (email:string,content:string) => {
  const res = await api.post('inquiries',{
    content: content,
    email: email,
    kind: "general"
  })
  if (res.status == 201) {
    return res;
  } else {
    return Promise.reject({
      messsage: 'Fail to post inquiries',
    });
  }
}

export const DeleteAccount = async () => {
  const res = await api.delete('users/');
  return res;
};
