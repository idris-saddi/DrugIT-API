import { Injectable, NotFoundException } from '@nestjs/common';
import { Target } from './entity/target.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetTargetDTO } from './dto/getTarget.dto';

@Injectable()
export class TargetService {
  @InjectRepository(Target)
  private readonly targetRepository: Repository<Target>;

  async deleteTarget(id: number) {
    const target = await this.targetRepository.findOneBy({ id: id });
    if (target) {
      await this.targetRepository.delete(id);
    } else throw new NotFoundException('target not found!');
  }
  async updateTarget(id: number, name: string, description: string) {
    const target = await this.targetRepository.findOneBy({ id: id });
    if (target) {
      let obj: { name?: string; description?: string } = {};
      if (name) obj.name = name;
      if (description) obj.description = description;
      await this.targetRepository.update(id, obj);
    } else throw new NotFoundException('target not found!');
  }
  async GetAllTarget() {
    const res = await this.targetRepository.find();
    const ret = [];
    res.forEach((e) => {
      ret.push(new GetTargetDTO(e));
    });
    return res;
  }
  async GetTarget(id: number) {
    return new GetTargetDTO(await this.targetRepository.findOneBy({ id: id }));
  }
  async CreateTarget(name: string, description: string) {
    await this.targetRepository.insert(
      await this.targetRepository.create({
        name: name,
        description: description,
      }),
    );
  }
}
