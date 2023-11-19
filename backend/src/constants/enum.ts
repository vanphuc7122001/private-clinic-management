export enum Roles {
  ADMIN = 'admin',
  DOCTOR = 'doctor',
  SUPPORTER = 'supporter',
  PATIENT = 'patient'
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
