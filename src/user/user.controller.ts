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
  Res,
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
import type { Response } from 'express';
import { UpdateInfoDTO } from './dto/UpdateInfor.dto';
import { GetHashAndSalt } from 'src/utils/bcrypt';

// File formats allowed here.
const array_of_allowed_file_types = ['image/png', 'image/jpeg', 'image/jpg'];
// Allowed file size in MB
const allowed_file_size = 5;
@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly userservice: UserService;
  @Inject(JwtService)
  private readonly jwtService: JwtService;

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('admin')
  @UseGuards(JwtAuthGuard)
  public async getAllUsers(@User() User): Promise<GetUserDTOForUserOrAdmin[]> {
    if (User.role == Role.ADMIN)
      return await this.userservice.getUserAllUsers();
    else throw new NotFoundException('page not found');
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
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
  @UseGuards(JwtAuthGuard)
  async getFile(@Res() res: Response, @Param('id') id: number) {
    const image = await this.userservice.getImage(id);
    res.sendFile(join(__dirname, '../../assets/', image));
  }

  @Post('signup')
  public async Signup(@Body() signupUserDto: SignUpUserDTO) {
    //  prevents spammers from signing up using disposable email
    // prevent fake people from registering
    // Uses the library "deep-email-validator"
    const ValidationResult = validate(signupUserDto.email);
    const UsernameUniquness = this.userservice.IsUsernameUnique(
      signupUserDto.username,
    );
    const EmailUniquness = this.userservice.IsEmailUnique(signupUserDto.email);
    const { valid, reason, validators } = await ValidationResult;
    if (valid) {
      // check if it's in the database or not
      if (!(await EmailUniquness)) {
        throw new HttpException(
          { message: 'email address used' },
          HttpStatus.BAD_REQUEST,
        );
      }
      if (!(await UsernameUniquness)) {
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
  public async login(@Body() credentials: CredentialsDTO) {
    const user = await this.userservice.validateUser(
      credentials.email,
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
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  public async updateProfileInfo(
    @User() User,
    @Body() info: UpdateInfoDTO,
  ): Promise<GetUserDTOForUserOrAdmin> {
    const { email, username, password, organization, phone } = info;
    let updateObject: {
      email?: string;
      username?: string;
      password?: string;
      salt?: string;
      organization?: string;
      phone?: string;
    } = {};

    if (password) {
      const pass = GetHashAndSalt(password);
      updateObject.password = pass.password;
      updateObject.salt = pass.salt;
    }
    if (organization) {
      updateObject.organization = organization;
    }
    if (phone) {
      updateObject.phone = phone;
    }
    if (email) {
      const ValidationResult = validate(email);
      const EmailUniquness = this.userservice.IsEmailUnique(email);
      const { valid, reason, validators } = await ValidationResult;
      if (valid) {
        if (await EmailUniquness) {
          updateObject.email = email;
        } else {
          throw new HttpException(
            { message: 'email address used' },
            HttpStatus.BAD_REQUEST,
          );
        }
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
    if (username) {
      if (await this.userservice.IsUsernameUnique(username)) {
        updateObject.username = username;
      } else {
        throw new HttpException(
          { message: 'username used' },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    return await this.userservice.UpdateUserInfo(User.id, updateObject);
  }

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
          const n = `${name}${randomName}${fileExtName}`;
          callback(null, n);
        },
        destination: './assets',
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
    await this.userservice.saveImage(User.id, file.filename);
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
