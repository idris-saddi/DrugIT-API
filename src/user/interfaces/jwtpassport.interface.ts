import { RoleEnum } from 'src/enum/Role.enum';

export interface JwtPayload {
  id: number;
  email: string;
  username: string;
  role: RoleEnum;
}
