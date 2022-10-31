import { HandlebarsAdapter, MailerModule } from '@nest-modules/mailer';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { ConfigModule } from './modules/config/config.module';
import { ConfigService } from './modules/config/config.service';
import { DatabaseModule } from './modules/database/database.module';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { AttendanceController } from './controllers/attendance.controller';
import { AttendanceService } from './services/attendance.service';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => (
        {
          transport: {
            host: config.get('MAIL_HOST'),
            port: config.getInt('MAIL_PORT'),
            secure: config.getBoolean('MAIL_SECURE'),
            auth: {
              user: config.get('MAIL_USER'),
              pass: config.get('MAIL_PSWD'),
            },
            tls: {
              rejectUnauthorized: false,
            },
          },
          defaults: {
            from: config.get('MAIL_FROM'),
          },
          template: {
            dir: __dirname + '/../src/views/mails',
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        }),
    }),
  ],
  controllers: [
    UserController,
    AttendanceController,
  ],
  providers: [
    UserService,
    AttendanceService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
      .exclude(
        {
          path: '/users',
          method: RequestMethod.GET,
        },
        {
          path: '/users/activation',
          method: RequestMethod.GET,
        },
        {
          path: '/users/preparelogin',
          method: RequestMethod.GET,
        },
        {
          path: '/users/register',
          method: RequestMethod.POST,
        },
        {
          path: '/users/login',
          method: RequestMethod.POST,
        },
        {
          path: '/recruitments/create',
          method: RequestMethod.POST,
        },
        {
          path: '/users/referral',
          method: RequestMethod.GET,
        },
        {
          path: '/users/redirectCustomLink',
          method: RequestMethod.GET,
        },
        {
          path: 'storage/:storageName/:container',
          method: RequestMethod.GET,
        },
        {
          path: 'users/resetPassword',
          method: RequestMethod.POST,
        },
        {
          path: 'users/sendResetPassword',
          method: RequestMethod.POST,
        },
        {
          path: 'recruitments/getEmployee',
          method: RequestMethod.GET,
        },
        {
          path: 'recruitments/getEmployeeData',
          method: RequestMethod.GET,
        },
        {
          path: 'recruitments/getAdminData',
          method: RequestMethod.GET,
        },
        {
          path: 'recruitments/pushNotif',
          method: RequestMethod.POST,
        },
        {
          path: 'recruitments/getBoardingData',
          method: RequestMethod.GET,
        },
        {
          path: 'recruitments/downloadTemplate',
          method: RequestMethod.GET,
        },
        {
          path: 'employees/getCurrencyList',
          method: RequestMethod.GET,
        },
        {
          path: 'recruitments/getLocation',
          method: RequestMethod.GET,
        },
        {
          path: 'education',
          method: RequestMethod.GET,
        },
        {
          path: 'education',
          method: RequestMethod.POST,
        },
        {
          path: 'employees/getMaritalList',
          method: RequestMethod.GET,
        },
        {
          path: 'employees/getEmpTypeList',
          method: RequestMethod.GET,
        }
      )
      .forRoutes(
        UserController,
        AttendanceController,
      );
  }
}
