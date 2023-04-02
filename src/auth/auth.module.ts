import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';

@Global()
@Module({
  imports:[TypeOrmModule.forFeature([User])],
  providers: [
    {useClass:AuthService,provide:"AUTH_SERVICE"}
  , {useClass:UserService,provide:"USER_SERVICE"}],
  controllers: [AuthController]
})
export class AuthModule {}
