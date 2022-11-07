import { Injectable } from "@nestjs/common";
import { Auth } from "src/interfaces/auth.dto";
import { Attendance } from "src/models/attendance";
import * as moment from 'moment';
import { Brackets } from "typeorm";
import { User } from "src/models/user";

@Injectable()
export class AttendanceService {

  constructor(
  ) { }

  async getAttData(auth: Auth) {
    try {
        const datas: any[] = [];
        const res = await Attendance.createQueryBuilder('att')
        .leftJoinAndMapOne('att.user', User, 'user', 'user.userId = att.userId')
        .where('att.userId = :userId', { userId: auth.userdata.userId })
        .getMany();

        if (res && res.length > 0) {
            for (let i = 0; i < res.length; i++) {
                const pushData = {
                    index: i + 1,
                    empName: `${res[i].user.firstName}` + ` ${res[i].user.middleName ? res[i].user.middleName : ''}` + ` ${res[i].user.lastName ? res[i].user.lastName : ''}`,
                    empNo:res[i].user.empNo, 
                    date: res[i].startTime ? moment(res[i].startTime).format('DD-MM-YYYY') : '',
                    clockIn: res[i].startTime ? moment(res[i].startTime).format('HH:mm:ss') : '',
                    clockOut: res[i].endTime ? moment(res[i].endTime).format('HH:mm:ss') : '',
                    latLong: res[i].latLong,
                    photo: res[i].photo,
                };
                datas.push(pushData);
            }
        }
        return datas;
    } catch (e) {
        throw e;
    }
  }

  async getAttToday(auth: Auth) {
    try {
        const currentToday: string = moment().subtract(1, "day").format('YYYY-MM-DD 17:00:00');
        let res: any;
        const get = await Attendance.createQueryBuilder('att')
        .where('att.userId = :userId', { userId: auth.userdata.userId })
        .andWhere('att.createdDate > :createdDate', { createdDate: currentToday })
        .getOne();

        console.log(get)

        if (!get) {
            res = {
                clockIn: 0,
                clockOut: 0,
            }
        } else {
            res = {
                clockIn: moment(get.startTime).format('HH:mm'),
                clockOut: moment(get.endTime).format('HH:mm'),
            }
        }

        return res;
    } catch (e) {
        throw e;
    }
  }

  async getAllAttData() {
    try {
        const datas: any[] = [];
        const res = await Attendance.createQueryBuilder('att')
        .leftJoinAndMapOne('att.user', User, 'user', 'user.userId = att.userId')
        .getMany();

        if (res && res.length > 0) {
            for (let i = 0; i < res.length; i++) {
                const pushData = {
                    index: i + 1,
                    empName: `${res[i].user.firstName}` + ` ${res[i].user.middleName ? res[i].user.middleName : ''}` + ` ${res[i].user.lastName ? res[i].user.lastName : ''}`,
                    empNo:res[i].user.empNo, 
                    date: res[i].startTime ? moment(res[i].startTime).format('DD-MM-YYYY') : '',
                    clockIn: res[i].startTime ? moment(res[i].startTime).format('HH:mm:ss') : '',
                    clockOut: res[i].endTime ? moment(res[i].endTime).format('HH:mm:ss') : '',
                    latLong: res[i].latLong,
                    photo: res[i].photo,
                };
                datas.push(pushData);
            }
        }
        return datas;
    } catch (e) {
        throw e;
    }
  }

  async recordAttendanceIn(auth: Auth, body: any) {
    try {
        const currentTime: string = moment().format('YYYY-MM-DD HH:mm:ss');
        const currentToday: string = moment().subtract(1, "day").format('YYYY-MM-DD 17:00:00');

        const findData = await Attendance.createQueryBuilder('att')
        .where('att.userId = :userId', { userId: auth.userdata.userId })
        .andWhere('att.startTime <= :startTime1', { startTime1: currentTime })
        .andWhere('att.startTime > :startTime2', { startTime2: currentToday })
        .getOne();

        if (findData) {
            await Attendance.createQueryBuilder()
            .where('attendId = :attendId', { attendId: findData.attendId })
            .andWhere('userId = :userId', { userId: auth.userdata.userId })
            .update()
            .set({
                startTime: currentTime,
                modifiedDate: currentTime,
            })
            .execute();
        } else {
            await Attendance.createQueryBuilder()
            .insert()
            .values({
                userId: auth.userdata.userId,
                startTime: currentTime,
                endTime: 0,
                latLong: body.latLong,
                photo: body.photo,
                createdDate: currentTime,
                modifiedDate: currentTime,
            })
            .execute();
        }
        return currentTime;
    } catch (e) {
        throw e;
    }
  }

  async recordAttendanceOut(auth: Auth, body: any) {
    try {
        const currentTime: string = moment().format('YYYY-MM-DD HH:mm:ss');
        const currentToday: string = moment().subtract(1, "day").format('YYYY-MM-DD 17:00:00');

        const findData = await Attendance.createQueryBuilder('att')
        .where('att.userId = :userId', { userId: auth.userdata.userId })
        .andWhere('att.startTime <= :startTime1', { startTime1: currentTime })
        .andWhere('att.startTime > :startTime2', { startTime2: currentToday })
        .getOne();

        if (findData) {
            await Attendance.createQueryBuilder()
            .where('attendId = :attendId', { attendId: findData.attendId })
            .andWhere('userId = :userId', { userId: auth.userdata.userId })
            .update()
            .set({
                endTime: currentTime,
                modifiedDate: currentTime,
            })
            .execute();
        } else {
            throw new Error('No Start Time found');
        }
        return currentTime;
    } catch (e) {
        throw e;
    }
  }
}