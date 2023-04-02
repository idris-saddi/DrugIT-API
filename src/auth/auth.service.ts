import { Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userservice: UserService,
  ) {}
  validateUserU(username: string, password: string) {}
  validateUserE(email: string, password: string) {}
}
