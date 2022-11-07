import { Body, Controller, Get, HttpStatus, Post, Req } from "@nestjs/common";
import { response, responseError } from "src/helpers/response.helper";
import { Auth } from "src/interfaces/auth.dto";
import { AttendanceService } from "src/services/attendance.service";

@Controller('attendance')
export class AttendanceController {

  constructor(
    private readonly attendanceService: AttendanceService,
  ) { }

  @Get('listing')
  async listing(@Req() req) {
    try {
      const auth: Auth = req.auth;
      const result =  await this.attendanceService.getAttData(auth);
      return response('Get Data', result);
    } catch (e) {
      return responseError(e.message, HttpStatus.UNAUTHORIZED);
    }
  }

  @Get('todayAttendance')
  async todayAttendance(@Req() req) {
    try {
      const auth: Auth = req.auth;
      const result =  await this.attendanceService.getAttToday(auth);
      return response('Get Data', result);
    } catch (e) {
      return responseError(e.message, HttpStatus.UNAUTHORIZED);
    }
  }

  @Get('listingAll')
  async listingAll() {
    try {
      const result =  await this.attendanceService.getAllAttData();
      return response('Get Data', result);
    } catch (e) {
      return responseError(e.message, HttpStatus.UNAUTHORIZED);
    }
  }

  @Post('clockIn')
  async clockIn(@Req() req, @Body() body: any) {
    try {
        const auth: Auth = req.auth;
        console.log('auth', auth);
        console.log('clockIn', body);
        const result = await this.attendanceService.recordAttendanceIn(auth, body);
        return response('Success Clock In', result);
    } catch (e) {
      return responseError(e.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  @Post('clockOut')
  async clockOut(@Req() req, @Body() body: any) {
    try {
        const auth: Auth = req.auth;
        const result = await this.attendanceService.recordAttendanceOut(auth, body);
        return response('Success Clock Out', result);
    } catch (e) {
      return responseError(e.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
