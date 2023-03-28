import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TargetController } from './target.controller';
import { TargetService } from './target.service';
import { Target } from './entity/target.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Target]),
  ],
  controllers: [TargetController],
  providers: [TargetService]
})
export class TargetModule {}
