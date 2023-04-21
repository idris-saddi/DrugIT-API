import { RoleEnum } from '../../enum/Role.enum';
import { Exclude } from 'class-transformer';

export class GetUserDTOForUserOrAdmin {
  username: string;
  email: string;
  organization: string;
  role: RoleEnum;
  phone: string;
  subscription: number;
  created_at: Date;
  updated_at: Date;

  @Exclude()
  id: number;
  @Exclude()
  password: string;
  @Exclude()
  salt: string;
  @Exclude()
  image: string;
  @Exclude()
  deleted_at: Date;

  constructor(partial: Partial<GetUserDTOForUserOrAdmin>) {
    Object.assign(this, partial);
  }
}
export class GetUserDTOForOtherUsers {
  username: string;
  email: string;
  organization: string;
  role: RoleEnum;
  phone: string;

  @Exclude()
  id: number;
  @Exclude()
  password: string;
  @Exclude()
  salt: string;
  @Exclude()
  image: string;
  @Exclude()
  deleted_at: Date;
  @Exclude()
  created_at: Date;
  @Exclude()
  updated_at: Date;
  @Exclude()
  subscription: number;

  constructor(partial: Partial<GetUserDTOForOtherUsers>) {
    Object.assign(this, partial);
  }
}
