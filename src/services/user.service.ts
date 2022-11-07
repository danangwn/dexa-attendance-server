import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as moment from 'moment';
import { Auth } from '../interfaces/auth.dto';
import { Response } from '../interfaces/response.dto';
import {LoginDTO, RegisterDTO } from '../interfaces/user.dto';
import { User } from '../models/user';
import { Accesstoken } from 'src/models/accesstoken';

@Injectable()
export class UserService {

  constructor(
  ) { }

  async newRegister(params: RegisterDTO) {
    try {
      let message = '';
      const currentTime: string = moment().format('YYYY-MM-DD HH:mm:ss');
      const password: string = params.password;
      const salt = await bcrypt.genSalt(10);
      const encryptedPass = await bcrypt.hash(password, salt);

      const user = await User.createQueryBuilder('user')
        .where('user.userName = :userName', { userName: params.userName })
        .getOne();

      if (user) {
        throw new Error('Usermame already exist')
      } else {
        await User.createQueryBuilder()
        .insert()
        .values({
          userName: params.userName,
          password: encryptedPass,
          email: params.userName,
          empNo: params.empNo,
          firstName: params.firstName,
          middleName: params.middleName,
          lastName: params.lastName,
          gender: params.gender ? 1 : 0,
          isAdmin: params.isAdmin && params.isAdmin === '1' ? 1 : 0,
          createdDate: currentTime,
          modifiedDate: currentTime,
          createdBy: 'admin',
          modifiedBy: 'admin',
        })
        .execute(); 

        message = `Register Success`; 
      }
      return message;
    } catch (e) {
      throw e;
    }
  }

  async login(params: LoginDTO): Promise<Response<{ token: string, user: User }>> {
    try {
      const password: string = params.password;
      const currentTime: string = moment().format('YYYY-MM-DD HH:mm:ss');
      let message = '';

      const user = await User.createQueryBuilder('user')
        .where('user.userName = :userName', { userName: params.username })
        .getOne();

      if (!user) {
        throw new Error('Account Not Found');
      }

      const hashpassword = await bcrypt.compare(password, user.password);
        if (!hashpassword) {
          throw new Error('Wrong password');
        }

        let token;
        const getToken = await Accesstoken.createQueryBuilder('accesstoken')
        .where('accesstoken.userId = :userId', { userId: user.userId })
        .getOne();

        if (!token) {
          const createToken = await Accesstoken.createQueryBuilder()
          .insert()
          .values({
            userId: user.userId,
            conf: '',
            createdDate: currentTime,
          })
          .execute();
          token = createToken.generatedMaps[0].id;
        } else {
          token = getToken.id;
        }

        return {
          message: 'Succces login',
          data: {
            token: token,
            user: user,
          }
        }
    } catch (e) {
      throw e;
    }
  }

  async logout(auth: Auth) {
    try {
      await Accesstoken.createQueryBuilder('accesstoken')
        .where('id = :token', { token: auth.accestoken.id })
        .delete()
        .execute();

      return {
        message: 'Success logout'
      };
    } catch (e) {
      throw e;
    }
  }

  async listing(auth: Auth){
    try {
      const res: any[] = [];
      let get: User[];

      if (auth.userdata.isAdmin) {
        get = await User.createQueryBuilder('user').getMany();
      } else {
        get = await User.createQueryBuilder('user')
        .where('user.userId = :userId', { userId: auth.userdata.userId })
        .getMany();
      }

      if (get && get.length > 0) {
        for (let i = 0; i < get.length; i++ ) {
          const pushData = {
            index: i + 1,
            userId: get[i].userId,
            empName: `${get[i].firstName}` + ` ${get[i].middleName ? get[i].middleName : ''}` + ` ${get[i].lastName ? get[i].lastName : ''}`,
            empNo: get[i].empNo,
            username: get[i].userName,
            email: get[i].email,
            gender: get[i].gender ? 'Male' : 'Female',
            role: get[i].isAdmin ? 'Admin' : 'Employee',
          };

          res.push(pushData);
        }
      }
      return res;
    } catch (e) {
      throw e;
    }
  }

  async delete(userId: number){
    try {
      await User.createQueryBuilder().where('userId = :userId', { userId: userId }).delete().execute();
      await Accesstoken.createQueryBuilder().where('userId = :userId', { userId: userId }).delete().execute();
      return true;
    } catch (e) {
      throw e;
    }
  }

  async update(auth: Auth, params: any) {
    try {
      const currentTime: string = moment().format('YYYY-MM-DD HH:mm:ss');
      const user = await User.createQueryBuilder('user')
      .where('user.userId = :userId', { userId: params.userId })
      .getOne();
      if (user) {
        await User.createQueryBuilder()
        .where('userId = :userId', { userId: user.userId })
        .update()
        .set({
          email: params.email,
          empNo: params.empNo,
          firstName: params.firstName,
          middleName: params.middleName,
          lastName: params.lastName,
          modifiedDate: currentTime,
          modifiedBy: auth.userdata.userName,
        })
        .execute();
      }
      return true;
    } catch (e) {
      throw e;
    }
  }

  async profile(auth: Auth, userId: number) {
    try {
      return await User.createQueryBuilder('user')
      .where('user.userId = :userId', { userId: userId })
      .getOne();
    } catch(e) {
      throw e;
    }
  }
}
