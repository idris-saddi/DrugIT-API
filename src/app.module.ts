import { Module } from '@nestjs/common';
/* MUST BE KEPT AT THE TOP SO ALL Modules have access to this */
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getEnvPath } from './common/helper/env.helper';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MoleculeModule } from './molecule/molecule.module';
import { ResultModule } from './result/result.module';
import { TargetModule } from './target/target.module';
import { RequestModule } from './request/request.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from './user/entity/user.entity';
import { Target } from './target/entity/target.entity';
import { Subscription } from './subscription/entity/subscription.entity';
import { Result } from './result/entity/result.entity';
import { Request } from './request/entity/request.entity';
import { Molecule } from './molecule/entity/molecule.entity';
import { MulterModule } from '@nestjs/platform-express';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: getEnvPath(`${__dirname}/../`),
      isGlobal: true,
    }),
    MulterModule.register({ dest: './assets' }),
    UserModule,
    MoleculeModule,
    ResultModule,
    TargetModule,
    RequestModule,
    SubscriptionModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (
        config: ConfigService,
      ): Promise<TypeOrmModuleOptions> => {
        return {
          type: 'mysql',
          host: config.get<string>('DATABASE_HOST'),
          port: config.get<number>('DATABASE_PORT'),
          database: config.get<string>('DATABASE_NAME'),
          username: config.get<string>('DATABASE_USER'),
          password: config.get<string>('DATABASE_PASSWORD'),
          entities: [User, Target, Subscription, Result, Request, Molecule],
          synchronize: true, // never use TRUE in production!
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
