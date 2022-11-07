import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  username: string;
  password: string;
}

export class RegisterDTO {
  userName: string;
  password: string;
  email: string;
  empNo: string;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: number;
  isAdmin: string;
}

export interface ActivationDTO {
  keys: string;
}
export interface PrepareLoginDTO {
  keys: string;
}

export class ReferralDTO {
  key: string;
}

export class ReferralJobDTO {
  companyCode: string;
  companyId: number;
  jobVacancyCode: string;
}
