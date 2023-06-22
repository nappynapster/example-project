export interface UserInterface {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  isActive: boolean;
  role: RoleEnum;
}

export enum RoleEnum {
  ADMIN = 'admin',
  MEMBER = 'member'
}
