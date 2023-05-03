import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ResultService } from './result.service';
import { ResultDTO } from './dto/resultDTO.dto';
import { JwtAuthGuard } from 'src/user/guards/jwtpassport.guard';
import { User } from 'src/decorators/user.decorator';
import { RoleEnum } from 'src/enum/Role.enum';
import { RequestService } from 'src/request/request.service';
import { ResultQueryDTO } from './dto/ResultQuery.dto';

@Controller('result')
export class ResultController {
  @Inject(ResultService)
  private readonly resultService: ResultService;

  @Inject(RequestService)
  private readonly requestService: RequestService;

  @Post()
  @UseGuards(JwtAuthGuard)
  public async createResult(@Body() Result: ResultDTO, @User() user) {
    if (user.role == RoleEnum.ADMIN) await this.resultService.createRes(Result);
    else throw new UnauthorizedException('access forbidden!');
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async getResult(@Param('id') id: number, @User() user) {
    /* I would only return results related to the user's requests */
    const res = await this.resultService.getResById(id);
    const req = await this.requestService.GetByUserMolTarget(
      user.id,
      res.target,
      res.molecule,
    );
    if (req || user.role == RoleEnum.ADMIN) {
      return res;
    } else throw new NotFoundException('Result Not Found!');
  }
  @Get('/molecule/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async getResultForAllMol(@Param('id') molid: number, @User() user) {
    if (user.role == RoleEnum.ADMIN) {
      return await this.resultService.getResByMol(molid);
    } else throw new NotFoundException();
  }
  @Get('/target/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async getResultForAllTarget(
    @Param('id') targetid: number,
    @User() user,
  ) {
    if (user.role == RoleEnum.ADMIN) {
      return await this.resultService.getResByTarget(targetid);
    } else throw new NotFoundException();
  }
  @Post('search')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async getResultByMolandTarget(
    @Body() Query: ResultQueryDTO,
    @User() user,
  ) {
    if (user.role == RoleEnum.ADMIN) {
      return await this.resultService.getRes(Query.molecule, Query.target);
    } else throw new NotFoundException();
  }
  @Get('/all')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async getAll(@User() user) {
    if (user.role == RoleEnum.ADMIN) {
      return await this.resultService.getAll();
    } else throw new NotFoundException();
  }

  /* Get all results related to all requests made by a user */
  @Get('/user/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async getAllForUser(@User() user, @Param('id') id: number) {
    if (user.role == RoleEnum.ADMIN || user.id == id) {
      return await this.resultService.getResByUser(id);
    } else throw new NotFoundException();
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async updateByid(
    @User() user,
    @Param('id') id: number,
    @Body() active: boolean,
  ) {
    await this.resultService.updateRes(id, active);
  }
  @Put('')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async updateByMolAndTarget(
    @User() user,
    @Body() put: ResultQueryDTO,
    @Body() active: boolean,
  ) {
    await this.resultService.updateRes(
      (
        await this.resultService.getRes(put.molecule, put.target)
      ).id,
      active,
    );
  }
}
