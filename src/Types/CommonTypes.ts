import { Gender, INameType, PaySlipFormatType, RegimeType, Status } from "./CommonConstants";

export interface IId<TId = string> {
  id: TId;
}
export interface IIdName<TId = string> extends IId<TId> {
  name: string;
}

export interface IdName {
    id?: string;
    name?: string;
}

export interface IFullName {
  title: string;
  first: string;
  last: string;
  alias: string;
}


export interface IUserProfile extends IId {
  name: IFullName;
  fullName: string;
  role: string;
  roles: string[];
  email: string;
  phoneNumber: string;
  address: IAddress;
  gender: number;
  birthDate: string;
  company: ICompanyIdName;
  employeeId: string;
  initPasswordChanged: boolean;
  userName: string;
  thumbUrl: string;
  isWFHAllowed: boolean;
  picture: {
    imagePath: string;
    thumbPath: string;
  };
  status: number;
}

export interface IAddress {
  building: string;
  street: string;
  city: string;
  county: string;
  postcode: string;
  country: string;
}

export interface IRecordUpdateInfo {
  userId: string;
  userName: string;
  date: Date;
}
export interface ICompany
{
    id: string;
    autoCmpId: string;
    cmpRefId: string;
    name: string;
    phoneNo: string;
    address: string;
    gstNo: string;
    probationDays: number;
    pSlipformat: PaySlipFormatType;
    isActive: string;
    branch: IBranch[];
    features: IFeatures[];
}
export interface IBranch
{
    branch: IIdName;
    address: string;
}
export interface IFeatures {
    fId:number;
    name: string;
}
export interface ICompanyIdName {
    id?: string;
    name?: string;
}
export interface IBranchIdName {
    id?: string;
    name?: string;
}
