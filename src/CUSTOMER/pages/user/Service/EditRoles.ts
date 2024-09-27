import $http from '@/CUSTOMER/axios';
import handleError from '@/CUSTOMER/axios/error';
import { ElMessageBox } from 'element-plus';

const API = (id: string) => `/api/auth/accounts/${id}/roles`;

export type typeRequest = {
  UserName: string;
  Roles: string[];
};

export default async (req: typeRequest) => {
  try {
    const { Roles, UserName } = req;
    const { data } = await $http.put(API(UserName), Roles);
    return data;
  } catch (error: any) {
    const status = error.typeResponse?.status;
    if (status === 400) {
      ElMessageBox.alert('輸入資料有誤(400)');
    } else {
      handleError(error);
    }

    throw error;
  }
};
