import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  Res,
  StreamableFile,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SignUpUserDTO } from './dto/SignUpUser.dto';
import { validate } from 'deep-email-validator';
import { UserService } from './user.service';
import {
  GetUserDTOForOtherUsers,
  GetUserDTOForUserOrAdmin,
} from './dto/GetUser.dto';
import { CredentialsDTO } from './dto/Credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { JwtAuthGuard } from './guards/jwtpassport.guard';
import { User } from 'src/decorators/user.decorator';
import { RoleEnum as Role, RoleEnum } from 'src/enum/Role.enum';
import path from 'path';
import { readdir } from 'fs/promises';
import { createReadStream } from 'fs';
import type { Response } from 'express';

// File formats allowed here.
const array_of_allowed_file_types = ['image/png', 'image/jpeg', 'image/jpg'];
// Allowed file size in MB
const allowed_file_size = 5;
const currentWorkingDirectory = process.cwd();
@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly userservice: UserService;
  private readonly jwtService: JwtService;

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('admin')
  @UseGuards(JwtAuthGuard)
  public async getAllUsers(@User() User): Promise<GetUserDTOForUserOrAdmin[]> {
    if (User.role == Role.ADMIN)
      return await this.userservice.getUserAllUsers();
    else throw new NotFoundException('page not found');
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  public async getUser(
    @Param('id') id: number,
    @User() User,
  ): Promise<GetUserDTOForOtherUsers | GetUserDTOForUserOrAdmin> {
    const forPrivate: boolean = User.role == Role.ADMIN || User.id == id;
    const user = await this.userservice.getUser(id, forPrivate);
    if (user) return user;
    else throw new NotFoundException('user with this id can not be found');
  }
  @Get('picture/:id')
  async getFile(
    @Res({ passthrough: true }) res: Response,
    @Param('id') id: number,
  ): Promise<StreamableFile> {
    const image = await this.userservice.getImage(id);
    const file = createReadStream(
      join(currentWorkingDirectory, './assets/' + image),
    );
    res.set({
      'Content-Type': `image/${extname(image)}`,
      'Content-Disposition': `attachment; filename="${image}"`,
    });
    return new StreamableFile(file);
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

  @Post('Login')
  public async login(credentials: CredentialsDTO) {
    const user = await this.userservice.validateUser(
      credentials.token,
      credentials.password,
    );
    if (!user) {
      throw new HttpException(
        {
          message:
            'User with given username or email not found or Wrong Password',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const payload = {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    };
    const jwt = this.jwtService.sign(payload);
    return { access_token: jwt };
  }

  @Put('ProfileInfo')
  @UseGuards(JwtAuthGuard)
  public async updateProfileInfo(@User() User) {}

  @Put('Picture')
  @UseGuards(JwtAuthGuard)
  //Field name is: ProfilePicture
  @UseInterceptors(
    FileInterceptor('ProfilePicture', {
      storage: diskStorage({
        filename: (req, file, callback) => {
          const name = Date.now().toString();
          const fileExtName = extname(file.originalname);
          const randomName = Array(4)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          callback(null, `${name}${randomName}.${fileExtName}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (
          !file.originalname.match(/\.(jpg|jpeg|png)$/) ||
          !array_of_allowed_file_types.includes(file.mimetype)
        ) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        if (file.size / (1024 * 1024) > allowed_file_size) {
          return callback(new Error('File too Large!'), false);
        }
        callback(null, true);
      },
    }),
  )
  public async updateProfilePicture(
    @User() User,
    @UploadedFile() file: Express.Multer.File,
  ) {
    await this.userservice.saveImage(User.id, file);
  }

  @Delete('Picture')
  @UseGuards(JwtAuthGuard)
  public async deleteProfilePicture(@User() User) {
    await this.userservice.removeImage(User.id);
  }
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  public async deleteUser(@User() User, @Param('id') id: number) {
    if (User.id == id || User.role == RoleEnum.ADMIN)
      await this.userservice.deleteUser(id);
    else throw new UnauthorizedException();
  }
}
