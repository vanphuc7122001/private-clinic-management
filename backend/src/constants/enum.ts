export enum Roles {
  ADMIN = 'admin',
  DOCTOR = 'doctor',
  SUPPORTER = 'supporter',
  PATIENT = 'patient',
  PHARMACIST = 'pharmacist'
}

export enum Genders {
  'Male' = 'male',
  'Female' = 'female',
  'Other' = 'other'
}

export enum TokenType {
  AccessToken,
  RefreshToken,
  ForgotPasswordToken
}

export enum AppoitmentStatus {
  UNCONFIRM = 'unconfirmed',
  CONFIRM = 'confirm',
  CANCEL = 'cancel'
}

export enum BillStatus {
  UNPAID = 'unpaid',
  PAID = 'paid'
}
