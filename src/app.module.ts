import { Module } from '@nestjs/common';
/* MUST BE KEPT AT THE TOP SO ALL Modules have access to this */
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MoleculeModule } from './molecule/molecule.module';
import { ResultModule } from './result/result.module';
import { TargetModule } from './target/target.module';
import { RequestModule } from './request/request.module';
import { TypeOrmModule } from '@nestjs/typeorm';



@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    UserModule,
    MoleculeModule,
    ResultModule,
    TargetModule,
    RequestModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT,10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
