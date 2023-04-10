import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompareHashAndPass, GetHashAndSalt } from 'src/utils/bcrypt';
import { Repository } from 'typeorm';
import { GetUserDTO } from './dto/GetUser.dto';
import { SignUpUserDTO } from './dto/SignUpUser.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  public async getUser(id: number): Promise<GetUserDTO> {
    const obj = await this.userRepository.findOneBy({ id: id });
    return new GetUserDTO(obj);
  }

  public async CreateUser(signupUserDto: SignUpUserDTO) {
    const { salt, password } = GetHashAndSalt(signupUserDto.password);
    await this.userRepository.insert(
      this.userRepository.create({ ...signupUserDto, password, salt }),
    );
  }

  public async IsUsernameUnique(username: string): Promise<boolean> {
    const user = await this.userRepository.findOneBy({ username: username });
    return user === null;
  }
  public async IsEmailUnique(email: string): Promise<boolean> {
    const user = await this.userRepository.findOneBy({ email: email });
    return user === null;
  }

  public async FindUser(param: string): Promise<User> {
    let obj = isAnEmail(param) ? { email: param } : { username: param };
    return await this.userRepository.findOneBy(obj);
  }
  public async validateUser(token: string, password: string) {
    const user = await this.FindUser(token);
    if (!user || CompareHashAndPass(password, user.password, user.salt)) {
      return null;
    } else {
      return user;
    }
  }
}
function isAnEmail(str: string): boolean {
  const regexExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
  return regexExp.test(str);
}
