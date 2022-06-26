import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Member } from './Member';
//import { Photo } from '../photos/photo.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  //@Column({ nullable: false, length: 100, collation: 'utf8_persian_ci' })
  //fName: string;

  //@Column({ nullable: false, length: 100, collation: 'utf8_persian_ci' })
  //lName: string;

  @Column({ nullable: false, length: 100, collation: 'utf8_persian_ci', unique: true })
  userName: string;

  @Column({ nullable: false, length: 100, collation: 'utf8_persian_ci' })
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isAgent: boolean;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ default: false })
  isSuperAdmin: boolean;

  @OneToMany(() => Member, (members) => members.user)
  members: Member[]

  @OneToMany(() => Member, (agent) => agent.agent)
  agent: Member[]

  //@Column({ nullable: false, length: 15, collation: 'utf8_persian_ci' })
  //phone: string;
  //@OneToMany(type => Photo, photo => photo.user)
  //photos: Photo[];
}
