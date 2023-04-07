import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetUserDTO } from './dto/GetUser.dto';
import { SignUpUserDTO } from './dto/SignUpUser.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  
  public async getUser(id: number): Promise<GetUserDTO> {
    const obj =  await this.userRepository.findOneBy({ id: id });
    return new GetUserDTO(obj);
  }

  public async CreateUser(signupUserDto: SignUpUserDTO) {
    await this.userRepository.insert(this.userRepository.create(signupUserDto));
  }

  public async IsUsernameUnique(username: string): Promise<boolean> {
    const user = await this.userRepository.findOneBy({ username: username });
    return user === null;
  }
  public async IsEmailUnique(email: string): Promise<boolean> {
    const user = await this.userRepository.findOneBy({ email: email });
    return user === null;
  }
}
