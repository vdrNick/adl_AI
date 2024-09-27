export default [
  {
    name: '帳號',
    route: 'user',
    icon: 'fas fa-user'
  }
] as {
  name: string;
  route: string;
  icon: string;
  /** 需求的角色，若擁有角色則可以無視 permission 取用節點 */
  roles?: string[];
  /** 固定的節點（暫）無論如何都會顯示的連結 */
  fixed?: boolean;
}[];
