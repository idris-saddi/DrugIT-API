import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { MoleculeService } from './molecule.service';
import { JwtAuthGuard } from 'src/user/guards/jwtpassport.guard';
import { CreateMolDto } from './dto/CreateMolDTO.dto';
import { UpdateMolDto } from './dto/UpdateMolDTO.dto';

@Controller('molecule')
export class MoleculeController {
  @Inject(MoleculeService)
  private readonly moleculeservice: MoleculeService;

  @Post()
  @UseGuards(JwtAuthGuard)
  public async CreateMol(@Body() mol: CreateMolDto) {
    await this.moleculeservice.CreateMolecule(mol);
  }
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  public async ModifyMol(@Param('id') id: number, @Body() mol: UpdateMolDto) {
    await this.moleculeservice.UpdateMolecule(id, mol);
  }
  @Get()
  @UseGuards(JwtAuthGuard)
  public async GetAllMol() {
    return await this.moleculeservice.GetAllMolecule();
  }
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  public async GetMol(@Param('id') id: number) {
    return await this.moleculeservice.GetMolecule(id);
  }
}
