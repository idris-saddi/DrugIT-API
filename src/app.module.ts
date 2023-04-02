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
import { SubscriptionModule } from './subscription/subscription.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entity/user.entity';
import { Target } from './target/entity/target.entity';
import { Subscription } from './subscription/entity/subscription.entity';
import { Result } from './result/entity/result.entity';
import { Request } from './request/entity/request.entity';
import { Molecule } from './molecule/entity/molecule.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    MoleculeModule,
    ResultModule,
    TargetModule,
    RequestModule,
    SubscriptionModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "",
      database: "drugit",
      entities: [User,Target,Subscription,Result,Request,Molecule],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
