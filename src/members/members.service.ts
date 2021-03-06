import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository, UpdateResult } from 'typeorm';
import { Member, User } from 'src/typeorm';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private membersRepository: Repository<Member>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(user: User): Promise<Member[]> {
    //return this.membersRepository.find();
    if(user.isAgent){
        return this.membersRepository.find({
            where: {
                agent : { id: user.id},
            }, order: {id : 'DESC'}
        });
    }else if(user.isAdmin || user.isSuperAdmin){
        return this.membersRepository.find({
          where: {
            agentConfirm : true,
          }, order: {id : 'DESC'}
        });
    }else {
      return this.membersRepository.find({
        where: {
            user : { id: user.id},
        }, order: {id : 'DESC'}
      });
    }
  }

  Insert(member: Member): Promise<InsertResult> {
    return this.membersRepository.insert(member);
  }

  async getAgents(): Promise<any[]> {
    var res = await this.membersRepository.find({
      where: {
          user : { isAgent: true },
      },
    });
    const agents = [];
    res.forEach(element => {
      agents.push({id: element.userId, name: element.fName + ' ' + element.lName});
    });
    return agents;
  }

  agentConfirm(ids: [number], status: boolean, user: User): boolean {
    ids.forEach(async (value: number, index: number) => {
      let m = await this.findOne(value, user);
      if(m){

        if(status){
          let cnt = await this.membersRepository.count({
            where: {
              agent: m.agent , agentConfirm: true
            },
          })

          let agent = await this.usersRepository.findOneBy({id: m.agentId});
          if(agent.agentLimit <= cnt){
            return false;
          }
        }

        m.agentConfirm = status;
        await this.membersRepository.save(m);
      }
    });
    return true;
  }

  adminConfirm(ids: [number], status: boolean, user: User): boolean {
    ids.forEach(async (value: number, index: number) => {
      let m = await this.findOne(value, user);
      if(m){
        m.adminConfirm = status;
        await this.membersRepository.save(m);
      }
    });
    return true;
  }

  superAdminConfirm(ids: [number], status: boolean, user: User): boolean {
    ids.forEach(async (value: number, index: number) => {
      let m = await this.findOne(value, user);
      if(m){
        m.superAdminConfirm = status;
        await this.membersRepository.save(m);
      }
    });
    return true;
  }

  delAll(ids: [number], user: User){
    ids.forEach(async (value: number, index: number) => {
      let m = await this.findOne(value, user);
      this.remove(m.id.toString());
    });
  }

  update(member: Member): Promise<Member> {
    return this.membersRepository.save(member);
  }

  findOne(mId: number, user: User): Promise<Member | undefined> {
    if(user.isAdmin || user.isSuperAdmin){
      return this.membersRepository.findOneBy({ id: mId });
    }else if(user.isAgent ){
      return this.membersRepository.findOneBy({
          id: mId, agent : { id: user.id },
      });
    }else {
      return this.membersRepository.findOneBy({
          id: mId, user : { id: user.id },
      });
    }
  }

  async remove(id: string): Promise<void> {
    await this.membersRepository.delete(id);
  }
}

