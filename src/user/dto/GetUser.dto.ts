import { RoleEnum } from '../../enum/Role.enum';
import { Exclude } from 'class-transformer';

export class GetUserDTO {
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

  constructor(partial: Partial<GetUserDTO>) {
    Object.assign(this, partial);
  }
}
