import { Body, Controller, Get, HttpStatus, Param, Post, Query, Req, Res } from '@nestjs/common';
import { createPaginationOptions } from 'src/helpers/pagination.helper';
import { responseError, response } from '../helpers/response.helper';
import { Auth } from '../interfaces/auth.dto';
import { ActivationDTO, LoginDTO, ReferralDTO, RegisterDTO } from '../interfaces/user.dto';
import { UserService } from '../services/user.service';
import { Response as res2 } from 'express';

@Controller('users')
export class UserController {

  constructor(
    private readonly userService: UserService,
  ) { }

  @Post('register')
  async register(@Body() params: RegisterDTO) {
    try {
      const result = await this.userService.newRegister(params);
      return response(result);
    } catch (e) {
      return responseError(e.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  @Post('login')
  async login(@Body() body: any) {
    try {
      console.log('excte')
      console.log('body', body)
      return await this.userService.login(body);
    } catch (e) {
      return responseError(e.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  @Post('logout')
  async logout(@Req() req) {
    try {
      const auth: Auth = req.auth;
      return await this.userService.logout(auth);
    } catch (e) {
      return responseError(e.message, HttpStatus.UNAUTHORIZED);
    }
  }

  @Get('profile')
  async profile(@Req() req, @Query() params) {
    try {
      const auth: Auth = req.auth;
      const userId = params.userId ? params.userId : auth.userdata.userId;
      const res = await this.userService.profile(auth, userId);
      return response('Get Data', res);
    } catch (e) {
      return responseError(e.message, HttpStatus.UNAUTHORIZED);
    }
  }

  @Get('listing')
  async listing(@Req() req) {
    try {
      const auth: Auth = req.auth;
      const result =  await this.userService.listing(auth);
      return response('Get Data', result);
    } catch (e) {
      return responseError(e.message, HttpStatus.UNAUTHORIZED);
    }
  }

  @Get('delete')
  async delete(@Query() params) {
    try {
        const userId = params.userId
        const result = await this.userService.delete(userId);
        return response('Success Delete User', result);
    } catch (e) {
      return responseError(e.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  @Post('update')
  async update(@Req() req, @Body() body: any) {
    try {
        const auth: Auth = req.auth;
        const result = await this.userService.update(auth, body);
        return response('Success Update User', result);
    } catch (e) {
      return responseError(e.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}

