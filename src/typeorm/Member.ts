import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  relation: number

  @Column()
  userId: number

  @ManyToOne((type) => User, (user) => user.members, {eager: true} )
  user: User

  @Column({nullable: true})
  agentId: number

  @ManyToOne((type) => User, (user) => user.agent, {eager: true})
  agent: User

  @Column({ nullable: true, length: 100 })
  fName: string;

  @Column({ nullable: true, length: 100 })
  lName: string;

  @Column({ nullable: true, length: 100 })
  pName: string;

  @Column({ nullable: true, length: 10 })
  nID: string;

  @Column({ nullable: true, length: 10 })
  pID: string;

  @Column({ nullable: true, type: 'date' })
  pDate: Date;

  @Column({ nullable: true, type: 'date' })
  bDate: Date;

  @Column({ nullable: true })
  gender: number;

  @Column({ nullable: true })
  religion: number;

  @Column({ nullable: true })
  border: number;

  @Column({ nullable: true })
  health: number;

  @Column({ nullable: true, length: 512 })
  healthDesc: string;

  @Column({ nullable: true })
  education: number;

  @Column({ nullable: true })
  job: number;
  
  @Column({ nullable: true })
  support: number;
  
  @Column({ nullable: true })
  earn: number;
  
  @Column({ nullable: true })
  earnAmount: number;

  @Column({ nullable: true })
  car: number;
  
  @Column({ nullable: true })
  selfTravel: number;
  
  @Column({ nullable: true })
  experienced: number;

  @Column({ nullable: true })
  exNum: number;

  @Column({ nullable: true })
  pay: number;

  @Column({ nullable: true, length: 100 })
  exLast: string;

  @Column({ nullable: true })
  experienced40: number;

  @Column({ nullable: true })
  ex40Num: number;

  @Column({ nullable: true, length: 100 })
  ex40Last: string;

  @Column({ nullable: true, length: 100 })
  bank: string;

  @Column({ nullable: true, length: 100 })
  acount: string;

  @Column({ nullable: true, length: 100 })
  shaba: string;

  @Column({ nullable: true, length: 100 })
  carType: string;

  @Column({ nullable: true, length: 100 })
  carYear: string;
  
  @Column({ nullable: true, length: 512 })
  jobDesc: string;

  @Column({ nullable: true, length: 512 })
  earnDesc: string;

  @Column({ nullable: true, length: 100 })
  vacFileName: string;

  @Column({ nullable: true, length: 100 })
  solFileName: string;

  @Column({ nullable: true, length: 100 })
  passFileName: string;

  @Column({ nullable: true, length: 100 })
  phone: string;

  @Column({ nullable: true, length: 100 })
  relMobile: string;

  @Column({ nullable: true, length: 512 })
  adr: string;

  @Column({ nullable: true, length: 15 })
  postalCode: string;

  @Column({ nullable: true })
  hasPass: boolean = false;

  @Column({ nullable: true })
  otherTravel: boolean = false;

  @Column({ nullable: true })
  married: number;

  @Column({ nullable: true })
  kids: number;

  @Column({ nullable: true })
  solType: number;

  @Column({ nullable: true })
  house: number;

  @Column({ nullable: true })
  locType: number;

  @Column({ nullable: true, length: 100 })
  province: string;

  @Column({ nullable: true, length: 100 })
  city: string;

  @Column({ nullable: true })
  agentConfirm: boolean = false;

  @Column({ nullable: true })
  adminConfirm: boolean = false;

  @Column({ nullable: true })
  superAdminConfirm: boolean = false;
  element: { id: number; isActive: boolean; isAgent: boolean; isAdmin: boolean; isSuperAdmin: boolean; members: Member[]; agent: Member[]; lastSent: Date; name: string; agentLimit: number; };

}
