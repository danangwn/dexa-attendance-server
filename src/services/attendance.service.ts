import { Injectable } from "@nestjs/common";
import { Auth } from "src/interfaces/auth.dto";
import { Attendance } from "src/models/attendance";
import * as moment from 'moment';
import { Brackets } from "typeorm";

@Injectable()
export class AttendanceService {

  constructor(
  ) { }

  async getAttData(auth: Auth) {
    try {
        return await Attendance.createQueryBuilder('att')
        .where('att.userId = :userId', { userId: auth.userdata.userId })
        .getMany();
    } catch (e) {
        throw e;
    }
  }

  async getAllAttData() {
    try {
        return await Attendance.createQueryBuilder('att').getMany();
    } catch (e) {
        throw e;
    }
  }

  async recordAttendanceIn(auth: Auth, body: any) {
    try {
        const currentTime: string = moment().format('YYYY-MM-DD HH:mm:ss');
        const currentToday: string = moment().format('YYYY-MM-DD 00:00:00');

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
                endTime: '',
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
        const currentToday: string = moment().format('YYYY-MM-DD 00:00:00');

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