import { Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
@Injectable()
export class UserService {
    async findOneUser(username : string):Promise<User | undefined> {
        return new User;
    }
}


