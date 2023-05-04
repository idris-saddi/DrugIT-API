import { Injectable, NotFoundException } from '@nestjs/common';
import { Result } from './entity/result.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResultDTO } from './dto/resultDTO.dto';
import { getResultDTO } from './dto/getResult.dto';
import { Molecule } from 'src/molecule/entity/molecule.entity';
import { Target } from 'src/target/entity/target.entity';
import { Request } from 'src/request/entity/request.entity';

@Injectable()
export class ResultService {
  @InjectRepository(Result)
  private readonly resultRepository: Repository<Result>;
  @InjectRepository(Request)
  private readonly requestRepository: Repository<Request>;
  @InjectRepository(Molecule)
  private readonly MoleculeRepository: Repository<Molecule>;
  @InjectRepository(Target)
  private readonly TargetRepository: Repository<Target>;

  public async getRes(moleculeid: number, targetid: number) {
    const ret = await this.resultRepository.findOneBy({
      molecule: { id: moleculeid },
      target: { id: targetid },
    });
    return new getResultDTO({
      id: ret.id,
      molecule: ret.molecule.id,
      target: ret.target.id,
      active: ret.active,
    });
  }
  public async createRes(Result: ResultDTO) {
    const molecule = this.MoleculeRepository.findOneBy({ id: Result.molecule });
    const target = this.TargetRepository.findOneBy({ id: Result.target });
    if (!(await molecule))
      throw new NotFoundException('molecule with this id is not found!');
    if (!(await target))
      throw new NotFoundException('target with this id is not found!');
    await this.resultRepository.insert(
      await this.resultRepository.create({
        molecule: await molecule,
        target: await target,
        active: Result.active,
      }),
    );
  }
  public async getResById(id: number) {
    const ret = await this.resultRepository.findOneBy({ id: id });
    return new getResultDTO({
      id: ret.id,
      molecule: ret.molecule.id,
      target: ret.target.id,
      active: ret.active,
    });
  }
  public async getAll() {
    const arr = await this.resultRepository.find();
    const rets = [];
    arr.forEach((ret) => {
      rets.push(
        new getResultDTO({
          id: ret.id,
          molecule: ret.molecule.id,
          target: ret.target.id,
          active: ret.active,
        }),
      );
    });
    return rets;
  }
  public async getResByMol(molid: number) {
    const arr = await this.resultRepository.findBy({ molecule: { id: molid } });
    const rets = [];
    arr.forEach((ret) => {
      rets.push(
        new getResultDTO({
          id: ret.id,
          molecule: ret.molecule.id,
          target: ret.target.id,
          active: ret.active,
        }),
      );
    });
    return rets;
  }
  public async getResByUser(id: number) {
    const all = this.requestRepository.findBy({ user: { id: id } });
    const temp = [];
    (await all).forEach((elem) => {
      temp.push(
        this.resultRepository.findOneBy({
          molecule: { id: elem.molecule.id },
          target: { id: elem.target.id },
        }),
      );
    });
    const temp2 = [];
    temp.forEach(async (elem) => {
      temp2.push(await elem);
    });
    const rets = [];
    temp2.forEach((ret) => {
      rets.push(
        new getResultDTO({
          id: ret.id,
          molecule: ret.molecule.id,
          target: ret.target.id,
          active: ret.active,
        }),
      );
    });
    return rets;
  }
  public async getResByTarget(targetid: number) {
    const arr = await this.resultRepository.findBy({
      target: { id: targetid },
    });
    const rets = [];
    arr.forEach((ret) => {
      rets.push(
        new getResultDTO({
          id: ret.id,
          molecule: ret.molecule.id,
          target: ret.target.id,
          active: ret.active,
        }),
      );
    });
    return rets;
  }
  public async updateRes(id: number, active: boolean) {
    const res = await this.resultRepository.findOneBy({ id: id });
    if (res) {
      await this.resultRepository.update(id, { active: active });
    } else throw new NotFoundException('wrong id!');
  }
}
