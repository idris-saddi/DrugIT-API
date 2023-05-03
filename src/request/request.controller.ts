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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateRequestDTO } from './dto/CreateRequestDTO.dto';
import { JwtAuthGuard } from 'src/user/guards/jwtpassport.guard';
import { User } from 'src/decorators/user.decorator';
import { RoleEnum } from 'src/enum/Role.enum';
import { RequestService } from './request.service';
import { StatusEnum } from 'src/enum/Status.enum';
import { ResultService } from 'src/result/result.service';
@Controller('request')
export class RequestController {
  @Inject(RequestService)
  private readonly requestService: RequestService;
  @Inject(ResultService)
  private readonly resultService: ResultService;

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async getRequest(@User() user, @Param('id') id: number) {
    const req = await this.requestService.getRequest(id);
    if (user.role == RoleEnum.ADMIN || req.userid == id) {
      return req;
    } else {
      throw new NotFoundException('request not found');
    }
  }
  @Get(':id/result')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async getRequestResult(@User() user, @Param('id') id: number) {
    const req = await this.requestService.getRequest(id);
    if (user.role == RoleEnum.ADMIN || req.userid == id) {
      if (req.status == StatusEnum.SUCCEEDED) {
        return await this.resultService.getRes(req.moleculeid, req.targetid);
      } else throw new NotFoundException('Still waiting');
    } else {
      throw new NotFoundException('request not found');
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  public async sendRequest(@Body() NewRequest: CreateRequestDTO) {
    await this.requestService.createRequest(NewRequest);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  public async deleteRequest(@User() user, @Param('id') id: number) {
    if (user.role == RoleEnum.ADMIN) {
      await this.requestService.deleteRequest(id);
    } else {
      throw new NotFoundException('page not found');
    }
  }

  @Get('/target/:targetId/all')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  public async getByTarget(@User() user, @Param('targetId') targetId: number) {
    if (user.role == RoleEnum.ADMIN) {
      return await this.requestService.getAllByTarget(targetId);
    } else {
      throw new NotFoundException();
    }
  }
  @Get('/target/:targetId/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  public async getByTargetByUser(
    @User() user,
    @Param('targetId') targetId: number,
    @Param('id') id: number,
  ) {
    if (user.role == RoleEnum.ADMIN || user.id == id) {
      return await this.requestService.getRequestsForUserByTarget(targetId, id);
    } else {
      throw new NotFoundException();
    }
  }

  @Get('/molecule/:Molid/all')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  public async getByMolecule(@User() user, @Param('Molid') Molid: number) {
    if (user.role == RoleEnum.ADMIN) {
      return await this.requestService.getAllByMolecule(Molid);
    } else {
      throw new NotFoundException();
    }
  }
  @Get('/molecule/:Molid/:Userid')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  public async getByMoleculeByUser(
    @User() user,
    @Param('Molid') Molid: number,
    @Param('Userid') id: number,
  ) {
    if (user.role == RoleEnum.ADMIN || user.id == id) {
      return await this.requestService.getRequestsForUserByMolecule(Molid, id);
    } else {
      throw new NotFoundException();
    }
  }
  @Get('/user/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  public async getAllByUser(@User() user, @Param('id') id: number) {
    if (user.role == RoleEnum.ADMIN || user.id == id) {
      return await this.requestService.getForUser(id);
    } else {
      throw new NotFoundException();
    }
  }
  @Get('/')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  public async getAll(@User() user) {
    if (user.role == RoleEnum.ADMIN) {
      return await this.requestService.get();
    } else {
      throw new NotFoundException();
    }
  }
}
