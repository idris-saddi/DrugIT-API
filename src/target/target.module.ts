import { Module } from '@nestjs/common';
import { TargetController } from './target.controller';
import { TargetService } from './target.service';

@Module({
  controllers: [TargetController],
  providers: [TargetService]
})
export class TargetModule {}
