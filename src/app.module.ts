import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import entities from './typeorm';
import { UsersModule } from './users/users.module';
import { MembersModule } from './members/members.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      // type: 'postgres',
      // host: 'localhost',
      // port: 5432,
      // username: 'postgres',
      // password: '213apr',
      // database: 'booking',
      // entities,
      // synchronize: true,
      // logging: true,

      url: 'postgres://shjoloxsbmbjvg:010d2226401796ae837abe9bbc3d675226ebb007288fa852ae9d184cf98bf198@ec2-176-34-215-248.eu-west-1.compute.amazonaws.com:5432/dfl0ale0upuqrg',
      type: 'postgres',
      host: 'ec2-176-34-215-248.eu-west-1.compute.amazonaws.com',
      port: 5432,
      username: 'shjoloxsbmbjvg',
      password: '010d2226401796ae837abe9bbc3d675226ebb007288fa852ae9d184cf98bf198',
      database: 'dfl0ale0upuqrg',
      entities,
      synchronize: true,
      extra: {
        ssl: true,
      },

      //synchronize: true,
      //logging: true,

      

    }),
    MembersModule,
    MulterModule.register({
      dest: './files',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      exclude: ['/api/auth*'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
