export const AppConstants = {
  acceptFilesStr: '.doc,.docx,.xls,.xlsx,.pdf,.txt,.csv,.jpg,.png,.jpeg,.bmp',
  acceptFiles: {
    custom: [
      '.doc',
      '.docx',
      '.xls',
      '.xlsx',
      '.pdf',
      '.jpg',
      '.png',
      '.jpeg',
      '.bmp',
      '.txt',
      '.csv',
    ],
  },
};

export enum FMonth {
    Jan = 1, 
    Feb = 2, 
    March = 3, 
    April = 4, 
    May = 5, 
    June = 6, 
    July = 7, 
    Aug = 8, 
    Sept = 9, 
    Oct = 10, 
    Nov = 11, 
    Dec = 12, 
}

export enum FeatureStatus {
  placeholder = 0,
  alpha = 1,
  beta = 2,
  release = 3,
}

export enum BusinessTypes {
  Limited = 0,
  LLP = 1,
  Soletrader = 2,
  Partnership = 3,
}
export enum Gender {
    Male = 1,
    Female = 2,
    Other  = 3
}

export enum RegimeType
{
    Old = 1,
    New = 2
}

export enum Status {
    Pending = 1,
    Approved = 2,
    Rejected=3
}

export enum INameType {
    InterestPaid = 1,
    PrincipalPaid = 2,
    AnnualRent = 3,
    MuncipalTax = 4,
    PanNameDetail=5,
}

export enum PFDeclarationType {
    None = 1,
    Fixlimit = 2,
    Variable = 3
}
export enum ESIDeclarationType {
    None = 1,    
    Variable = 2
}
export enum PaySlipFormatType{
    Format_A = 1,
    Format_B = 2,
    Format_C = 3,
    Format_D = 4,
    Format_E = 5,
}

export enum YearFormat {
        CalenderMonth = 1,
        FinancialMonth = 2,
}

export enum ILeftType {
    Undefined = 0,
    Resign = 1,
    Terminate = 2
}

export enum IOverTimePay{
        Undefined = 0,
        Hourly = 1,
        Custom = 2,
}

export enum ICalType {
    Undefined = 0,
    WorkingDays = 1,
    MonthlyDays = 2,
}