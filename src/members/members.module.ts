import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member, User } from 'src/typeorm';
import { MembersService } from './members.service';

@Module({
  imports: [TypeOrmModule.forFeature([Member]), TypeOrmModule.forFeature([User])],
  providers: [MembersService],
  exports: [MembersService],
})
export class MembersModule {}
