import { Inject, Injectable } from '@nestjs/common/decorators/core';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport/dist';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwtpassport.interface';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;
  constructor(private readonly config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('SECRET'),
    });
  }
  async validate(payload: JwtPayload) {
    const temp = await this.userRepository.findOneBy({
      username: payload.username,
    });
    if (temp) {
      const { id, email, username, role } = temp;
      const user = { id, email, username, role };
      return user;
    } else {
      throw new UnauthorizedException();
    }
  }
}
