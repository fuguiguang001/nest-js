/**
 * Get get请求方式
 * Query 获取get请求方式的前端传值方法
 * Param 获取get请求动态参数前端传值方法
 * Post post请求方式
 * Body 获取post请求方式的前端传值方法
 * Headers 获取Headers中的内容
 * HttpCode 接口直接返回的状态🐴
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Headers,
  HttpCode,
  Req,
  Res,
  Session,
} from '@nestjs/common';
import { UserService } from './user.service';
import * as svgCaptcha from 'svg-captcha';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('code')
  createCaptcha(@Req() req, @Res() res, @Session() session) {
    const captcha = svgCaptcha.create({
      size: 4, //生成几个验证码
      fontSize: 50, //文字大小
      width: 100, //宽度
      height: 34, //高度
      background: '#cc9966', //背景颜色
    });
    session.code = captcha.text; //存储验证码记录到session
    res.type('image/svg+xml');
    res.send(captcha.data);
  }

  @Post('create')
  cleatUser(@Body() req, @Session() session) {
    console.log(req, session.code);
    return {
      code: 200,
      message:
        session.code.toLocaleLowerCase() === req.code.toLocaleLowerCase()
          ? '验证码正确'
          : '验证码错误',
    };
  }

  // get请求
  @Get()
  findAll(@Query() req) {
    return {
      code: 200,
      name: req.name,
    };
  }

  // get 动态id
  @Get(':id')
  findId(@Param() req, @Headers() header) {
    console.log(111, req);
    return {
      code: 200,
      id: req.id,
      data: header,
    };
  }

  // psot请求
  @Post()
  create(@Body() req) {
    return {
      code: 200,
      name: req.name,
    };
  }
}
