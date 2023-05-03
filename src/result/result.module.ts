import { Module } from '@nestjs/common';
import { ResultController } from './result.controller';
import { ResultService } from './result.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Result } from './entity/result.entity';
import { Request } from 'src/request/entity/request.entity';
import { Molecule } from 'src/molecule/entity/molecule.entity';
import { Target } from 'src/target/entity/target.entity';
import { RequestService } from 'src/request/request.service';
import { User } from 'src/user/entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Result]),
    TypeOrmModule.forFeature([Request]),
    TypeOrmModule.forFeature([Molecule]),
    TypeOrmModule.forFeature([Target]),
    TypeOrmModule.forFeature([User]),

  ],
  controllers: [ResultController],
  providers: [ResultService,RequestService],
})
export class ResultModule {}
