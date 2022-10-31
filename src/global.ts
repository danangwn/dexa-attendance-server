import { Config } from './helpers/config.helper';
export class Global {

  static appMode(): string {
    if (Config.get('APP_MODE') === 'local') {
      return 'local';
    } else if (Config.get('APP_MODE') === 'development') {
      return 'dev';
    } else {
      return 'production';
    }
  }

  static appHost(): string {
    if (Config.get('APP_MODE') === 'local') {
      return `http://127.0.0.1:${Config.getNumber('APP_PORT')}`;
    } else if (Config.get('APP_MODE') === 'development') {
      return 'https://api.greatdayhr.com/stagingrecruitment';
    } else {
      return 'https://api.greatdayhr.com/recruitment';
    }
  }

  static dir() {
    return __dirname;
  }
}
