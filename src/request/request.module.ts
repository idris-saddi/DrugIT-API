import { Module } from '@nestjs/common';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request } from './entity/request.entity';
import { Molecule } from 'src/molecule/entity/molecule.entity';
import { Target } from 'src/target/entity/target.entity';
import { User } from 'src/user/entity/user.entity';
import { ResultService } from 'src/result/result.service';
import { Result } from 'src/result/entity/result.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Request]),
    TypeOrmModule.forFeature([Molecule]),
    TypeOrmModule.forFeature([Target]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Result]),

  ],
  controllers: [RequestController],
  providers: [RequestService, ResultService],
})
export class RequestModule {}
