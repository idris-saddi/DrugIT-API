import { Module } from '@nestjs/common';
import { MoleculeController } from './molecule.controller';
import { MoleculeService } from './molecule.service';

@Module({
  controllers: [MoleculeController],
  providers: [MoleculeService]
})
export class MoleculeModule {}
