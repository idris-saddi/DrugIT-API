import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMolDto } from './dto/CreateMolDTO.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Molecule } from './entity/molecule.entity';
import { Repository } from 'typeorm';
import { UpdateMolDto } from './dto/UpdateMolDTO.dto';

@Injectable()
export class MoleculeService {
  @InjectRepository(Molecule)
  private readonly MoleculeRepository: Repository<Molecule>;

  GetMolecule(id: number): Promise<Molecule | null> {
    return this.MoleculeRepository.findOneBy({ id: id });
  }
  GetAllMolecule(): Promise<Molecule[] | null> {
    return this.MoleculeRepository.find();
  }
  async UpdateMolecule(id: number, mol: UpdateMolDto) {
    if (await this.GetMolecule(id)) {
      await this.MoleculeRepository.update(id, mol);
    } else {
      throw new NotFoundException('Molecule not found.');
    }
  }
  async CreateMolecule(mol: CreateMolDto) {
    await this.MoleculeRepository.insert(
      await this.MoleculeRepository.create(mol),
    );
  }
}
