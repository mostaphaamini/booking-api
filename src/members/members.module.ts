import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from 'src/typeorm';
import { MembersService } from './members.service';

@Module({
  imports: [TypeOrmModule.forFeature([Member])],
  providers: [MembersService],
  exports: [MembersService],
})
export class MembersModule {}
