import { Exclude } from 'class-transformer';
import { Result } from 'src/result/entity/result.entity';
import { Request } from 'src/request/entity/request.entity';
export class GetTargetDTO {
  id: number;
  name: string;
  description: string;

  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;

  @Exclude()
  deleted_at: Date;

  @Exclude()
  requests: Request[];

  @Exclude()
  results: Result[];
  constructor(partial: Partial<GetTargetDTO>) {
    Object.assign(this, partial);
  }
}
