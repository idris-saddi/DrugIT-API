import { Module } from '@nestjs/common';
import { ResultController } from './result.controller';
import { ResultService } from './result.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Result } from './entity/result.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Result]),
  ],
  controllers: [ResultController],
  providers: [ResultService]
})
export class ResultModule {}
