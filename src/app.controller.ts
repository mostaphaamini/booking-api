import { Controller, Request, Get, Post, UseGuards, UseInterceptors, UploadedFile, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { UsersService } from 'src/users/users.service';
import { Member, User } from './typeorm';
import { MembersService } from './members/members.service';
import { FileInterceptor } from '@nestjs/platform-express';

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    private readonly memberService: MembersService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth/profile')
  getProfile(@Request() req) {
    return this.getProfilePost(req);
  }

  @UseGuards(JwtAuthGuard)
  @Post('auth/profile')
  async getProfilePost(@Request() req) {
    const user: User = await this.userService.findOne(req.user.id);
    const { password, ...result } = user;
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Post('auth/profiles')
  getProfilesPost(@Request() req) {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post('auth/getMembers')
  getMembers(@Request() req) {
    return this.memberService.findAll(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('auth/member')
  async getMember(@Request() req) {
    let id = req.body.params.id;
    if(id == null){
      return false;
    }
    let res = await this.memberService.findOne(id, req.user);
    console.log(res);
    return res;
  }

  @UseGuards(JwtAuthGuard)
  @Post('auth/saveMember')
  saveMember(@Request() req) {
    const { agentConfirm, adminConfirm, superAdminConfirm, ...result } = req.body.params;
    return this.memberService.update(result);
  }

  @UseGuards(JwtAuthGuard)
  @Post('auth/file')
  @UseInterceptors(
    FileInterceptor('image'),
  )
  async uploadedFile(@UploadedFile() vac, @Request() req) {
      const response = {
        originalname: vac.originalname,
        filename: vac.filename,
      };
      return response;
  }

  //@UseGuards(JwtAuthGuard)
  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res, @Request() req) {
    return res.sendFile(image, { root: './files' });
  }


  @UseGuards(JwtAuthGuard)
  @Post('auth/delMember')
  delMember(@Request() req) {
    let u: User = req.user;
    let ids = req.body.params.ids;
    
    this.memberService.delAll(ids, u);
  }

  @UseGuards(JwtAuthGuard)
  @Post('auth/addMember')
  async addMember(@Request() req) {
    let u: User = req.user;
    let m = new Member();
    m.user = req.user;
    m.relation = 1;
    const insertResult = await this.memberService.Insert(m);
    return insertResult.raw.insertId;
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth/getAgents')
  async getAgents() {
    return this.memberService.getAgents();
  }


  @UseGuards(JwtAuthGuard)
  @Post('auth/agentConfirm')
  setStatus(@Request() req) {
    let status = req.body.params.status;
    let ids = req.body.params.ids;
    return this.memberService.agentConfirm(ids, status, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('auth/adminConfirm')
  setStatusAdmin(@Request() req) {
    let status = req.body.params.status;
    let ids = req.body.params.ids;
    return this.memberService.adminConfirm(ids, status, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('auth/superAdminConfirm')
  setStatusSAdmin(@Request() req) {
    let status = req.body.params.status;
    let ids = req.body.params.ids;
    return this.memberService.superAdminConfirm(ids, status, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('auth/updateMe')
  update(@Request() req) {
    let u: User = req.user;
    //u.fName = req.body.params.fName;
    this.userService.update(u);
  }

  @Post('auth/addUser')
  async addUser(@Request() req) {
    console.log('ddddd ' + req.body.params);
    let u = new User();
    u.userName = req.body.params.username;
    u.password = '123';
    const insertResult = await this.userService.Insert(u);
    console.log(insertResult);
    return insertResult.raw.insertId;
  }
}
