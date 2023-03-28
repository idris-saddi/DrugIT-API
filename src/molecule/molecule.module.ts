import { Module } from '@nestjs/common';
import { MoleculeController } from './molecule.controller';
import { MoleculeService } from './molecule.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Molecule } from './entity/molecule.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Molecule]),
  ],
  controllers: [MoleculeController],
  providers: [MoleculeService]
})
export class MoleculeModule {}
