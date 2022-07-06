import { Controller, Request, Get, Post, UseGuards, UseInterceptors, UploadedFile, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { UsersService } from 'src/users/users.service';
import { Member, User } from './typeorm';
import { MembersService } from './members/members.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { HttpService } from '@nestjs/axios';

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
    private readonly httpService: HttpService,
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
    //console.log(res);
    return res;
  }

  @UseGuards(JwtAuthGuard)
  @Post('auth/saveMember')
  saveMember(@Request() req) {
    const { agentConfirm, adminConfirm, superAdminConfirm, ...result } = req.body.params;
    result.userId = req.user.id;
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
    //return this.memberService.getAgents();
    return this.userService.getAgents();
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

  sendMsg(u: User){
    let smsText = `کد ورود به سامانه ثبت نام سفر زیارتی کربلا ` + u.password;
    smsText = encodeURI(smsText);
    let smsStr = `http://ecosms.ir/index2.php?goto=webservice/json&method=send&arg1=${process.env.SMSPANELUSER}&arg2=${process.env.SMSPANELPASS}&arg3=${u.userName}&arg4=${process.env.SMSPANELNUM}&arg5=${smsText}`;
    //console.log(smsStr);
    this.httpService.get(smsStr, { maxContentLength: 5000 }).subscribe((res) => {
      //console.log(res);
    });
  }

  dateDiffInMins(dateSent: Date){
    let currentDate = new Date();
    return  Math.floor(( currentDate.getTime() - dateSent.getTime() ) /(1000 * 60));
  }

  // @Post('auth/addUser')
  // async addUser(@Request() req) {
  //   let u = new User();
  //   u.userName = req.body.params.username;
  //   u.password = Math.floor(10000000 + Math.random() * 90000000).toString();
  //   u.lastSent = new Date();

  //   let existUser = await this.userService.findOneByUser(u.userName);
  //   if(existUser){
  //     let dif = this.dateDiffInMins(existUser.lastSent);
  //     if(dif < 2){
  //       return;
  //     }

  //     existUser.lastSent = new Date();
  //     existUser.password = u.password;
  //     this.userService.update(existUser);
  //     this.sendMsg(u);
  //     return existUser.id;
  //   }else{
  //     this.sendMsg(u);
  //     const insertResult = await this.userService.Insert(u);
  //     return insertResult.raw.insertId;
  //   }
  // }
}
