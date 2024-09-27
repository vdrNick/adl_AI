import $http from '@/CUSTOMER/axios';
import handleError from '@/CUSTOMER/axios/error';
import { ElMessage } from 'element-plus';
// import { saveAuth } from '@/CUSTOMER/lib/auth';

type typeLogin = {
  Email: string;
  Password: string;
};

// type response = {
//   /** "Bearer" */
//   tokenType: string;
//   accessToken: string;
//   /** 3600 */
//   expiresIn: number;
//   refreshToken: string;
// };

export default async (myForm: typeLogin) => {
  try {
    await $http.post('/api/identity/login?useCookies=true', myForm);
    // if (login.status === 200) {
    // const res = login.data as response;
    // 儲存Authorization
    // saveAuth(res);
    // }
  } catch (error: any) {
    const status = error.response?.status;
    if (status === 401) {
      ElMessage.warning('帳號或密碼錯誤(HTTP 401)');
    } else {
      handleError(error);
    }

    throw error;
  }
};
