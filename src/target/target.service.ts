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
      ret.push(new GetTargetDTO({id:e.id,description:e.description,name:e.name}));
    });
    return ret;
  }
  async GetTarget(id: number) {
    const ret = await this.targetRepository.findOneBy({ id: id });
    return new GetTargetDTO({id:ret.id,description:ret.description,name:ret.name});
  }
  async CreateTarget(name: string, description: string) {
    
    console.log(this.targetRepository);
    await this.targetRepository.insert(
      await this.targetRepository.create({
        name: name,
        description: description,
      }),
    );

    // const t =  this.targetRepository.create({
    //       name: name,
    //       description: description,
    //     });
    //     await this.targetRepository.save(t);
  }
}
