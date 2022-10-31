import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { isString } from 'util';

export class SaveProfileDTO {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsNumber()
  expectedSalary: number;

  @IsNumber()
  gender: number;

  @IsNumber()
  maritalStatus: number;

  @IsString()
  phone: string;

  @IsString()
  location: string;

  @IsString()
  address: string;

  @IsString()
  educations: AddEducationDTO[];

  @IsString()
  experiences: AddExperienceDTO[];

  description: string;

  cvAttachment: string;

  profilePhoto: string;

  skillCode: string[];

  website: string;

  birthDay: Date;

  currencyCode: string;

  licenseType: string;

  startWorking: Date;

  motorcycleLicense: number;

  carLicense: number;

  birthPlace: string;

  religion: string;

  socialMedia: any;
}

export class EditProfileDTO {
  @IsString()
  firstName?: string;

  @IsString()
  lastName?: string;

  description?: string;

  phone?: string;

  @IsNumber()
  maritalStatus: number;

  @IsNumber()
  gender?: number;

  @IsString()
  email?: string;

  @IsString()
  address?: string;

  @IsString()
  location?: string;

  profilePhoto?: string;

  cvAttachmentPath?: string;

  skillCode: string[];

  website: string;

  @IsNumber()
  expectedSalary: number;

  birthDay: Date;

  currencyCode: string;

  licenseType: string;

  startWorking: Date;

  motorcycleLicense: number;

  carLicense: number;

  birthPlace: string;

  religion: string;

  socialMedia: any;
}

export class AddEducationDTO {
  @IsString()
  education: string;

  @IsString()
  degree: string;

  @IsString()
  faculty: string;

  @IsString()
  major: string;

  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;

  @IsString()
  country: string;

  @IsString()
  city: string;

  @IsString()
  gpa: string;

  @IsString()
  certificateNo: string;

  attachment: any;

  graduated: number;
  
  description: string;
}

export class AddExperienceDTO {
  @IsString()
  title: string;

  @IsString()
  position: string;

  @IsString()
  description: string;

  @IsString()
  startSalary?: string;

  @IsString()
  endSalary: string;

  @IsString()
  reasonResign?: string;

  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;

  @IsString()
  companyName: string;

  @IsString()
  companyAddress: string;

  @IsString()
  companyPhone?: string;

  employeeType: string;

  terminated: number;

  latestSalary: number;

  benefit: string;
}
export class EditEducationDTO {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  education: string;

  @IsString()
  degree: string;

  @IsString()
  faculty: string;

  @IsString()
  major: string;

  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;

  @IsString()
  country: string;

  @IsString()
  city: string;

  @IsString()
  gpa: string;

  @IsString()
  certificateNo: string;

  graduated?: number;

  description: string;
}

export class EditExperienceDTO {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  jobTitle: string;

  @IsString()
  position: string;

  @IsString()
  description: string;

  @IsString()
  startSalary?: string;

  @IsString()
  endSalary: string;

  @IsString()
  reasonResign?: string;

  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;

  @IsString()
  companyName: string;

  @IsString()
  companyAddress: string;

  @IsString()
  companyPhone?: string;

  @IsString()
  employeeType?: string;

  terminated?: number;

  latestSalary: number;

  benefit: string;
}
export class DeleteExperienceDTO {
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class DeleteEducationDTO {
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class EducationCertificatUploadDTO {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  certificateNo: string;
}

export class CvUploadDTO {
  @IsString()
  @IsNotEmpty()
  applicantId: string;
}