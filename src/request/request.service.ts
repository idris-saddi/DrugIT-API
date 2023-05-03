import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRequestDTO } from './dto/CreateRequestDTO.dto';
import { Request } from './entity/request.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  GetDTO,
  GetDTOForMol,
  GetDTOForTarget,
  GetDTOForUser,
  GetDTOForUserByMol,
  GetDTOForUserByTarget,
} from './dto/GetDTO.dto';
import { Molecule } from 'src/molecule/entity/molecule.entity';
import { Target } from 'src/target/entity/target.entity';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class RequestService {
  @InjectRepository(Request)
  private readonly requestRepository: Repository<Request>;
  @InjectRepository(Molecule)
  private readonly MoleculeRepository: Repository<Molecule>;
  @InjectRepository(Target)
  private readonly TargetRepository: Repository<Target>;
  @InjectRepository(User)
  private readonly UserRepository: Repository<User>;

  async get(): Promise<GetDTO[]> {
    const res = await this.requestRepository.find();
    const ret: GetDTO[] = [];
    res.forEach((elem) => {
      ret.push(new GetDTO(elem));
    });
    return ret;
  }
  async getRequest(id: number): Promise<GetDTO> {
    return new GetDTO(await this.requestRepository.findOneBy({ id: id }));
  }
  async getForUser(id: number) {
    const res = await this.requestRepository.find({
      where: { user: { id: id } },
    });
    const ret: GetDTOForUser[] = [];
    res.forEach((elem) => {
      ret.push(new GetDTOForUser(elem));
    });
    return ret;
  }
  async getAllByMolecule(molid: number) {
    const res = await this.requestRepository.findBy({
      molecule: { id: molid },
    });
    const ret: GetDTOForMol[] = [];
    res.forEach((elem) => {
      ret.push(new GetDTOForMol(elem));
    });
    return ret;
  }
  async getRequestsForUserByMolecule(molid: number, id: number) {
    const res = await this.requestRepository.findBy({
      molecule: { id: molid },
      user: { id: id },
    });
    const ret: GetDTOForUserByMol[] = [];
    res.forEach((elem) => {
      ret.push(new GetDTOForUserByMol(elem));
    });
    return ret;
  }
  async getRequestsForUserByTarget(targetid: number, id: number) {
    const res = await this.requestRepository.findBy({
      target: { id: targetid },
      user: { id: id },
    });
    const ret: GetDTOForUserByTarget[] = [];
    res.forEach((elem) => {
      ret.push(new GetDTOForUserByTarget(elem));
    });
    return ret;
  }
  async getAllByTarget(targetid: number) {
    const res = await this.requestRepository.findBy({
      target: { id: targetid },
    });
    const ret: GetDTOForTarget[] = [];
    res.forEach((elem) => {
      ret.push(new GetDTOForTarget(elem));
    });
    return ret;
  }
  async deleteRequest(id: number) {
    if (await this.requestRepository.findOneBy({ id: id }))
      await this.requestRepository.delete(id);
    else throw new NotFoundException('request with this id is not found');
  }
  async createRequest(NewRequest: CreateRequestDTO, id: number) {
    if (NewRequest.user != id)
      throw new BadRequestException('not matching information');
    const user = this.UserRepository.findOneBy({ id: NewRequest.user });
    const molecule = this.MoleculeRepository.findOneBy({
      id: NewRequest.molecule,
    });
    const target = this.TargetRepository.findOneBy({ id: NewRequest.target });
    if (!(await user))
      throw new NotFoundException('user with this id is not found!');
    if ((await user).subscription == 0)
      throw new BadRequestException('You have no more subscription!!');
    if (!(await molecule))
      throw new NotFoundException('molecule with this id is not found!');
    if (!(await target))
      throw new NotFoundException('target with this id is not found!');

    await this.requestRepository.insert(
      await this.requestRepository.create({
        user: await user,
        molecule: await molecule,
        target: await target,
        status: NewRequest.status,
      }),
    );
    if ((await user).subscription > 0)
      await this.UserRepository.update(id, {
        subscription: (await user).subscription - 1,
      });
  }

  async GetByUserMolTarget(id: number, Targetid: number, Molid: number) {
    return new GetDTO(
      await this.requestRepository.findOneBy({
        user: { id: id },
        target: { id: Targetid },
        molecule: { id: Molid },
      }),
    );
  }
}
