export type Theme = 'light' | 'dark'
export type Local = 'en' | 'zh-CN'
export interface Setting {
  theme: Theme
  local: Local
}
export interface Menu {
  component: string
  icon: string
  keepAlive: string
  embedded: string
  menuId: number
  menuType: string
  name: string
  orderNum: number
  parentId: number
  path: string
  permission: string
  query: string
  remark: string
  status: string
  visible: string
  children?: Menu[]
}

export interface User {
  avatar: string
  deptId: string
  deptName: string
  email: string
  name: string
  nickname: string
  password: string
  phone: string
  posts: Post[]
  remark: null
  roles: Role[]
  sex: string
  status: string
  userExtraData: { [key: string]: any }
  userId: string
  username: string
  [property: string]: any
}

export interface Post {
  postCode: string
  postId: string
  postName: string
  postSort: number
  remark: string
  [property: string]: any
}

export interface Role {
  dataScope?: string
  deptIds?: string[]
  menuIds?: string[]
  permissions?: string[]
  remark?: string
  roleCode?: string
  roleId?: string
  roleName?: string
  [property: string]: any
}
