import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { User } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from 'src/user/guards/jwtpassport.guard';
import { TargetService } from './target.service';
import { RoleEnum } from 'src/enum/Role.enum';

@Controller('target')
export class TargetController {
  @Inject(TargetService)
  private readonly targetService: TargetService;

  @Post('')
  @UseGuards(JwtAuthGuard)
  public async CreateTarget(
    @User() user,
    @Body() name: string,
    @Body() description: string,
  ) {
    if (user.role == RoleEnum.ADMIN) {
      await this.targetService.CreateTarget(name, description);
    } else throw new NotFoundException();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async GetTarget(@Param('id') id: number) {
    return await this.targetService.GetTarget(id);
  }

  @Get('/all')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async GetAllTargets(@User() user) {
    if (user.role == RoleEnum.ADMIN || user.role == RoleEnum.CLIENT) {
      return await this.targetService.GetAllTarget();
    } else throw new NotFoundException();
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  public async UpdateTarget(
    @Param('id') id: number,
    @User() user,
    @Body() name: string = null,
    @Body() description: string = null,
  ) {
    if (user.role == RoleEnum.ADMIN) {
      return await this.targetService.updateTarget(id, name, description);
    } else throw new NotFoundException();
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  public async DeleteTarget(@Param('id') id: number, @User() user) {
    if (user.role == RoleEnum.ADMIN) {
      return await this.targetService.deleteTarget(id);
    } else throw new NotFoundException();
  }
}
