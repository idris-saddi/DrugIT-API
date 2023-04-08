import { Inject, Injectable } from '@nestjs/common/decorators/core';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  @Inject(AuthService)
  private readonly authService: AuthService;
  constructor() {
    super();
  }
  /*
    NOTE :
    +========================================+
        you must provide a username field 
        and a password field in the body json
        *however*, the code will work whether
        the provided value is an email or a 
        username as long as the field name would
        be username.
    +========================================+
    */
  async validate(username: string, password: string) {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new HttpException(
        {
          message:
            'User with given username or email not found or Wrong Password',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }
}
