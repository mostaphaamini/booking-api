import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/typeorm';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUserPass(username, pass);
    if (user) {
      const { password, ...result } = user;
      return result;
    } else {
      let u: User = new User();
      u.userName = username;
      u.password = pass;
      await this.usersService.Insert(u);
      const user2 = await this.usersService.findOneByUserPass(username, pass);
      const { password, ...result2 } = user;
      return result2;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      userId: user.id,
      firstName: user.fName,
      lastName: user.lName,
    };
    return {
      access_token: this.jwtService.sign(user),
    };
  }
}
