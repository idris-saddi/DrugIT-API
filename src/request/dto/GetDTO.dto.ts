import { Exclude } from 'class-transformer';
import { StatusEnum } from 'src/enum/Status.enum';

export class GetDTO {
  id: number;
  moleculeid: number;
  targetid: number;
  userid: number;
  status: StatusEnum;
  @Exclude()
  created_at: string;
  @Exclude()
  updated_at: string;
  @Exclude()
  deleted_at: string;
  constructor(partial: Partial<GetDTO>) {
    Object.assign(this, partial);
  }
}
export class GetDTOForUser {
  id: number;
  moleculeid: number;
  targetid: number;
  @Exclude()
  userid: number;
  status: StatusEnum;
  @Exclude()
  created_at: string;
  @Exclude()
  updated_at: string;
  @Exclude()
  deleted_at: string;
  constructor(partial: Partial<GetDTOForUser>) {
    Object.assign(this, partial);
  }
}
export class GetDTOForMol {
  id: number;
  @Exclude()
  moleculeid: number;
  targetid: number;
  userid: number;
  status: StatusEnum;
  @Exclude()
  created_at: string;
  @Exclude()
  updated_at: string;
  @Exclude()
  deleted_at: string;
  constructor(partial: Partial<GetDTOForMol>) {
    Object.assign(this, partial);
  }
}
export class GetDTOForUserByMol {
  id: number;
  @Exclude()
  moleculeid: number;
  targetid: number;
  @Exclude()
  userid: number;
  status: StatusEnum;
  @Exclude()
  created_at: string;
  @Exclude()
  updated_at: string;
  @Exclude()
  deleted_at: string;
  constructor(partial: Partial<GetDTOForUserByMol>) {
    Object.assign(this, partial);
  }
}
export class GetDTOForTarget {
  id: number;
  moleculeid: number;
  @Exclude()
  targetid: number;
  userid: number;
  status: StatusEnum;
  @Exclude()
  created_at: string;
  @Exclude()
  updated_at: string;
  @Exclude()
  deleted_at: string;
  constructor(partial: Partial<GetDTOForTarget>) {
    Object.assign(this, partial);
  }
}
export class GetDTOForUserByTarget {
  id: number;
  moleculeid: number;
  @Exclude()
  targetid: number;
  @Exclude()
  userid: number;
  status: StatusEnum;
  @Exclude()
  created_at: string;
  @Exclude()
  updated_at: string;
  @Exclude()
  deleted_at: string;
  constructor(partial: Partial<GetDTOForUserByTarget>) {
    Object.assign(this, partial);
  }
}
