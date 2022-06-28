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
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '213apr',
      database: 'booking',
      entities,
      synchronize: true,
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
