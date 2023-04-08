import { Inject, Injectable } from '@nestjs/common/decorators/core';
import { UserService } from 'src/user/user.service';
import { CompareHashAndPass } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
  @Inject(UserService)
  private readonly userService: UserService;
  public async validateUser(username: string, password: string) {
    const user = await this.userService.FindUser(username);
    if (!user || CompareHashAndPass(password, user.password, user.salt)) {
      return null;
    } else {
      return user;
    }
  }
}
