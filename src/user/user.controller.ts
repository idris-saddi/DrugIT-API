import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { SignUpUserDTO } from './dto/SignUpUser.dto';
import { validate } from 'deep-email-validator';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { GetUserDTO } from './dto/GetUser.dto';

@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly userservice: UserService;

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  public async getUser(@Param('id') id: number): Promise<GetUserDTO> {
    return await this.userservice.getUser(id);
  }

  @Post('signup')
  public async Signup(@Body() signupUserDto: SignUpUserDTO) {
    //  prevents spammers from signing up using disposable email
    // prevent fake people from registering
    // Uses the library "deep-email-validator"
    const { valid, reason, validators } = await validate(signupUserDto.email);
    if (valid) {
      // check if it's in the database or not
      if (!(await this.userservice.IsEmailUnique(signupUserDto.email))) {
        throw new HttpException(
          { message: 'email address used' },
          HttpStatus.BAD_REQUEST,
        );
      }
      if (!(await this.userservice.IsUsernameUnique(signupUserDto.username))) {
        throw new HttpException(
          { message: 'username used' },
          HttpStatus.BAD_REQUEST,
        );
      }
      // Everything is good so far till here so we can add the user:
      await this.userservice.CreateUser(signupUserDto);
      // 201 Will be returned by default.
    } else {
      throw new HttpException(
        {
          message: 'Please provide a valid email address.',
          reason: validators[reason].reason,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
