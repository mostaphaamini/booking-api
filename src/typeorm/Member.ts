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

  @ManyToOne((type) => User, (user) => user.members)
  user: User

  @Column({nullable: true})
  agentId: number

  @ManyToOne((type) => User, (user) => user.agent)
  agent: User

  @Column({ nullable: true, length: 100, collation: 'utf8_persian_ci' })
  fName: string;

  @Column({ nullable: true, length: 100, collation: 'utf8_persian_ci' })
  lName: string;

  @Column({ nullable: true, length: 100, collation: 'utf8_persian_ci' })
  pName: string;

  @Column({ nullable: true, length: 10, collation: 'utf8_persian_ci' })
  nID: string;

  @Column({ nullable: true, length: 10, collation: 'utf8_persian_ci' })
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

  @Column({ nullable: true, length: 512, collation: 'utf8_persian_ci' })
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

  @Column({ nullable: true, length: 100, collation: 'utf8_persian_ci' })
  exLast: string;

  @Column({ nullable: true, length: 100, collation: 'utf8_persian_ci' })
  bank: string;

  @Column({ nullable: true, length: 100, collation: 'utf8_persian_ci' })
  acount: string;

  @Column({ nullable: true, length: 100, collation: 'utf8_persian_ci' })
  shaba: string;

  @Column({ nullable: true, length: 100, collation: 'utf8_persian_ci' })
  carType: string;

  @Column({ nullable: true, length: 100, collation: 'utf8_persian_ci' })
  carYear: string;
  
  @Column({ nullable: true, length: 512, collation: 'utf8_persian_ci' })
  jobDesc: string;

  @Column({ nullable: true, length: 512, collation: 'utf8_persian_ci' })
  earnDesc: string;

  @Column({ nullable: true, length: 100, collation: 'utf8_persian_ci' })
  vacFileName: string;

  @Column({ nullable: true, length: 100, collation: 'utf8_persian_ci' })
  solFileName: string;

  @Column({ nullable: true, length: 100, collation: 'utf8_persian_ci' })
  passFileName: string;

  @Column({ nullable: true, length: 512, collation: 'utf8_persian_ci' })
  adr: string;

  @Column({ nullable: true, length: 15, collation: 'utf8_persian_ci' })
  postalCode: string;

  @Column({ nullable: false })
  hasPass: boolean = false;

  @Column({ nullable: false })
  married: boolean = false;

  @Column({ nullable: false })
  agentConfirm: boolean = false;

  @Column({ nullable: false })
  adminConfirm: boolean = false;

  @Column({ nullable: false })
  superAdminConfirm: boolean = false;

}
