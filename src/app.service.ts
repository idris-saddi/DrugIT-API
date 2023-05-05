import { Injectable } from '@nestjs/common';
@Injectable()
export class AppService {
  IsAuthorized(): string {
    return 'test purpose';
  }
}
