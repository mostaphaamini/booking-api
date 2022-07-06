import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository, UpdateResult } from 'typeorm';
import { User } from 'src/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async Insert(user: User): Promise<InsertResult> {
    return await this.usersRepository.insert(user);
  }

  active(ids: [number], status: boolean): boolean {
    //this.connection.query("UPDATE user SET isActive ${status} WHERE id IN (${ids});");
    ids.forEach(async (value: number, index: number) => {
      let u = await this.findOne(value);
      u.isActive = status;
      await this.usersRepository.save(u);
    });
    return true;
  }

  update(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  findOne(id: number): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ id });
  }

  async getAgents(): Promise<any[]> {
    var res = await this.usersRepository.find({
      where: {
          isAgent: true,
      },
    });
    const agents = [];
    res.forEach(element => {
      agents.push({id: element.id, name: element.name });
    });
    return agents;
  }

  findOneByUserPass2(
    userName: string,
    password: string,
  ): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ userName, password });
  }

  findOneByUserPass(
    userName: string,
    password: string,
  ): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: {
        userName,
        password,
      },
    });
  }

  findOneByUser( userName: string, ): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: {
        userName,
      },
    });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
