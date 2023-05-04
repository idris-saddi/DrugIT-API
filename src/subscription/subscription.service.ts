import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubscriptionService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  public async Free(id: number) {
    const user = await this.userRepository.findOneBy({ id: id });
    if (user.subscription < 0) {
      await this.userRepository.update(id, { subscription: 0 });
    } else
      throw new BadRequestException('You already got your free subscriptions!');
  }
  public async Entreprise(id: number) {
    await this.userRepository.update(id, { subscription: -2 });
  }
  public async Pro(id: number) {
    await this.userRepository.update(id, { subscription: -1 });
  }
}
