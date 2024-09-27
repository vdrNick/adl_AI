import { defineStore } from 'pinia';

export type userInfo = {
  Permissions: typePermission[];
  Roles: string[];
  /** 'tester' */
  UserName: string;
  Email: string;
  /**  '測試人員' */
  ChiName: string;
};

type typePermission = {
  ActionId: 'r' | 'w' | 'u' | 'd';
  // '讀取'
  ActionName: string;
  // 'iws-r';
  Code: string;
  // 'iws'
  SubjectId: string;
  //'IWS圖控'
  SubjectName: string;
};

function getUserInfo(): userInfo {
  try {
    const str = localStorage.getItem('getUserInfo') || '{}';
    return JSON.parse(str);
  } catch (error) {
    return {} as userInfo;
  }
}

export const useUserInfoStore = defineStore({
  id: 'userInfo',
  state: () => ({
    userInfo: getUserInfo() as userInfo
  }),
  actions: {},
  getters: {}
});
