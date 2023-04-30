import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompareHashAndPass, GetHashAndSalt } from 'src/utils/bcrypt';
import { ObjectType, Repository } from 'typeorm';
import {
  GetUserDTOForOtherUsers,
  GetUserDTOForUserOrAdmin,
} from './dto/GetUser.dto';
import { SignUpUserDTO } from './dto/SignUpUser.dto';
import { User } from './entity/user.entity';
import { unlinkSync } from 'fs';

@Injectable()
export class UserService {
  async UpdateUserInfo(id: number, updateObject):Promise<GetUserDTOForUserOrAdmin> {
    const user = await this.userRepository.findOneBy({id:id});
    const updated = {...user,...updateObject};
    await this.userRepository.update({id:id},updated);
    return new GetUserDTOForUserOrAdmin(updated);
  }
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;
  public async getImage(id: number) {
    const { image } = await this.userRepository.findOneBy({ id: id });
    return image;
  }
  public async saveImage(id: number, filename: string) {
    const image = await this.getImage(id);
    if (image != '0.png') {
      unlinkSync('../../assets/' + image);
    }
    await this.userRepository.update({ id: id }, { image: filename });
  }
  public async removeImage(id: number) {
    const image = await this.getImage(id);
    if (image != '0.png') {
      unlinkSync('../../assets/' + image);
    }
    await this.userRepository.update({ id: id }, { image: '0.png' });
  }
  public async getUser(
    id: number,
    forPrivate: boolean,
  ): Promise<GetUserDTOForOtherUsers | GetUserDTOForUserOrAdmin> {
    const obj = await this.userRepository.findOneBy({ id: id });
    if (forPrivate) return new GetUserDTOForUserOrAdmin(obj);
    else {
      return new GetUserDTOForOtherUsers(obj);
    }
  }
  public async getUserAllUsers(): Promise<GetUserDTOForUserOrAdmin[]> {
    return await this.userRepository.find();
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
    if (!user || !CompareHashAndPass(password, user.password, user.salt)) {
      return null;
    } else {
      return user;
    }
  }
  public async deleteUser(id: number) {
    await this.userRepository.softDelete(id);
  }
}
function isAnEmail(str: string): boolean {
  const regexExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
  return regexExp.test(str);
}
