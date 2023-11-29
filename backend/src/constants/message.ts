export const ROLE_MESSAGES = {
  GET_ROLES_SUCCESS: 'Get roles success',
  CREATE_ROLES_SUCCESS: 'Create roles success',
  ROLE_TYPE_INVALID: 'Role type invalid',
  ROLE_IS_REQUIRED: 'Role is required'
} as const

export const USER_MESSAGES = {
  REGISTER_SUCCESS: 'Register success',
  NAME_IS_REQUIRED: 'Name is required',
  NAME_MUST_BE_A_STRING: 'Name must be a string',
  GENDER_IS_REQUIRED: 'Gender is required',
  ADDRESS_IS_REQUIRED: 'Address is required',
  ADDRESS_MUST_BE_STRING: 'Address must be a string',
  PHONE_IS_REQUIRED: 'Phone is required',
  PHONE_MUST_BE_STRING: 'Phone must be a string',
  EMAIL_IS_INVALID: 'Email is invalid',
  PASSWORD_IS_REQUIRED: 'Password is required',
  PASSWORD_MUST_BE_A_STRING: 'Password must be a string',
  PASSWORD_MUST_BE_STRONG: 'Password must be strong',
  IS_PATIENT_MUST_BE_A_BOOLEAN: 'Is patient must be a boolean',
  IS_PATIENT_IS_REQUIRED: 'Is patient is required',
  ROLE_ID_IS_REQUIRED: 'Role ID is required',
  ROLE_ID_MUST_BE_A_STRING: 'Role ID must be a string',
  AVATAR_MUST_BE_STRING: 'Avatar must be a string',
  ROLE_NOT_FOUND: 'Role not found',
  EMAIL_ALREADY_EXIST: 'Email already exists',
  CONFIRM_PASSWORD_MUST_EQUAL_PASSWORD: 'Password must be equal to the password',
  LOGIN_SUCCESS: 'Login succeeded',
  EMAIL_OR_PASSWORD_INCORRECT: 'Email or password incorrect',
  EMAIL_IS_REQUIRED: 'Email is required',
  ACCESS_TOKEN_IS_REQUIRED: 'Access token is required',
  REFRESH_TOKEN_IS_REQUIRED: 'Refresh token is required',
  USED_REFRESH_TOKEN_OR_NOT_EXIST: 'Used refresh token is not exist',
  REFRESH_TOKEN_SUCCESS: 'Refresh token was successfully',
  LOGOUT_SUCCESS: 'Logout was successfully',
  GET_ME_SUCCESS: 'Get me was successfully',
  CHANGE_PASSWORD_SUCCESS: 'Change password was successfully',
  USER_NOT_FOUND: 'User not found',
  OLD_PASSWORD_NOT_MATCH: 'Old password was not match',
  CONFIRM_PASSWORD_IS_REQUIRED: 'Confirm password is required',
  CONFIRM_PASSWORD_MUST_BE_A_STRING: 'Confirm password must be a string',
  CONFIRM_PASSWORD_MUST_BE_STRONG: 'Confirm password must be strong',
  CONFIRM_PASSWORD_MUST_BE_THE_SAME_AS_PASSWORD: 'Confirm password must be the same as the specified password',
  CHECK_EMAIL_TO_RESET_PASSWORD: 'Check email to reset password',
  FORGOT_PASSWORD_TOKEN_IS_REQUIRED: 'Forgot password token is required',
  INVALID_FORGOT_PASSWORD_TOKEN: 'Invalid forgot password token',
  RESET_PASSWORD_SUCCESS: 'Reset password successfully',
  UPDATE_ME_SUCCESS: 'Update me successfully',
  DATE_OF_BIRTH_IS_REQUIRED: 'Date of birth is required',
  DATE_OF_BIRTH_MUST_BE_ISO8601: 'Date of birth must be ISO8601',
  NOT_PERMISSION: 'Not allowed to access this resource',
  USER_IS_PATIENT_CANNOT_OTHER_ASSINGMENT: 'User is patient cannot other assignment'
} as const

export const MEDIA_MESSAGES = {
  UPLOAD_IMAGE_SINGLE_SUCCESS: 'Uploading image is successfully uploaded',
  ERROR_WHEN_DELETE_IMAGE: 'Err deleting image',
  ERROR_WHEN_UPDATE_IMAGE: 'Error when updating image'
} as const

export const CATEROGY_MESSAGES = {
  CATEROGY_MUST_BE_STRING: 'Category must be a string',
  CATEROGY_IS_REQUIRED: 'Category is required',
  CATEROGY_ALREADY_EXISTS: 'Category already exists',
  CREATE_CATEROGY_SUCCESS: 'Create category successfully',
  GET_ALL_CATEROGIES_SUCCESS: 'Get all categories successfully',
  UPDATE_CATEROGY_SUCCESS: 'Update category successfully',
  DELETE_CATEROGY_SUCCESS: 'Delete category successfully',
  ID_IS_REQUIRED: 'ID is required',
  CATEROGY_NOT_FOUND: 'Category does not exist',
  GET_CATEROGY_SUCCES: 'GET category successfully'
} as const

export const MEDICAL_SERVICE_MESSAGES = {
  NAME_ALREADy_EXISTS: 'Medical service already exists',
  CREATE_MEDICAL_SERVICE_SUCCESS: 'Create Medical service successfully',
  GET_ALL_MEDICAL_SERVICES_SUCCESS: 'Get all Medical services successfully',
  UPDATE_MEDICAL_SERVICE_SUCCESS: 'Update Medical service successfully',
  DELETE_MEDICAL_SERVICE_SUCCESS: 'Delete Medical service successfully',
  ID_IS_REQUIRED: 'ID is required',
  NAME_MUST_BE_A_STRING: 'Name must be a string',
  NAME_IS_REQUIRED: 'Name must be a string',
  PRICE_MUST_BE_STRING: 'Price must be a string',
  PRICE_IS_REQUIRED: 'Price is required',
  SERVICE_NOT_FOUND: 'service not found'
} as const

export const NEWS_MESSAGES = {
  CREATE_NEWS_SUCCESS: 'Create news successfully',
  TITLE_MUST_BE_A_STRING: 'Title must be a string',
  TITLE_IS_REQUIRED: 'Title is required',
  IMAGES_MUST_BE_A_STRING: 'Images must be a string',
  IMAGES_IS_REQUIRED: 'Images is required',
  DESC_MUST_BE_A_STRING: 'Desc must be a string',
  DESC_IS_REQUIRED: 'Desc is required',
  CONTENT_MUST_BE_A_STRING: 'Content must be a string',
  CONTENT_IS_REQUIRED: 'Content is required',
  GET_ALL_NEWS_SUCCESS: 'Get all news articles successfully',
  GET_NEWS_SUCCESS: 'Get news articles successfully',
  UPDATE_NEWS_SUCCESS: 'Update news articles successfully',
  DELETE_NEWS_SUCCESS: 'Delete news articles successfully',
  CATEROGY_NOT_FOUND: 'Caterogy not found',
  ID_IS_REQUIRED: 'ID is required',
  NEWS_NOT_FOUND: 'News not found'
} as const

export const MEDICINE_MESSAGES = {
  CREATE_MEDICINE_SUCCESS: 'Create new medicine successfully',
  UPDATE_MEDICINE_SUCCESS: 'Update medicine successfully',
  DELETE_MEDICINE_SUCCESS: 'Delete medicine successfully',
  GET_ALL_MEDICINE_SUCCESS: 'Get all medicine successfully',
  NAME_IS_REQUIRED: 'Name is required',
  NAME_MUST_BE_A_STRING: 'Name must be a string',
  MANUFACTURER_MUST_BE_STRING: 'Manufacture must be a string',
  MANUFACTURER_IS_REQUIRED: 'Manufacture is required',
  USAGE_MUST_BE_STRING: 'Usage must be a string',
  USAGE_IS_REQUIRED: 'Usage is required',
  QUANTITY_MUST_BE_A_STRING: 'Quantity must be a string',
  QUANTITY_IS_REQUIRED: 'Quantity is required',
  PRICE_MUST_BE_A_STRING: 'Price must be a string',
  PRICE_IS_REQUIRED: 'Price is required',
  PURCHASE_PRICE_MUST_BE_A_STRING: 'Purchase price must be a string',
  PURCHASE_PRICE_IS_REQUIRED: 'Purchase price is required',
  ID_IS_REQUIRED: 'ID is required',
  MEDICINE_NOT_FOUND: 'Medicine not found'
} as const

export const DOCTOR_MESSAGES = {
  CREATE_DOCTOR_SUCCESS: 'Create doctor successfully',
  UPDATE_DOCTOR_SUCCESS: 'Update doctor successfully',
  GET_DOCTOR_SUCCESS: 'Get doctor successfully',
  GET_DOCTORS_SUCCESS: 'Get doctors successfully',
  DELETE_DOCTOR_SUCCESS: 'Delete doctor successfully',
  DOCTOR_ID_MUST_BE_A_STRING: 'Doctors ID must be a string',
  DOCTOR_ID_IS_REQUIRED: 'Doctor ID is required',
  CERTIFICATION_IS_REQUIRED: 'Certificate is required',
  CERTIFICATION_MUST_BE_A_STRING: 'Certificate must be a string',
  EXPIRIENCE_IS_REQUIRED: 'Expiration is required',
  EXPIRIENCE_MUST_BE_A_STRING: 'Expiration must be a string',
  EDUCATION_IS_REQUIRED: 'Education is required',
  EDUCATION_MUST_BE_A_STRING: 'Education must be a string',
  USER_NOT_FOUND_OR_USER_IS_NOT_DOCTOR: 'User is not found or is not a doctor',
  ID_IS_REQUIRED: 'ID is required',
  DOCTOR_NOT_FOUND: 'Doctor  not found ',
  DOCTOR_ALREADY_EXIST: 'Doctor already exists'
} as const

export const MEDICAL_RECORD_MESSAGES = {
  CREATE_MEDICAL_RECORD_SUCCESS: 'Create medical record successfully',
  UPDATE_MEDICAL_RECORD_SUCCESS: 'Update medical record successfully',
  GET_MEDICAL_RECORD_SUCCESS: 'Get medical record successfully',
  GET_MEDICAL_RECORDS_SUCCESS: 'Get medical records successfully',
  DELETE_MEDICAL_RECORD_SUCCESS: 'Delete medical record successfully',
  SERVICES_MUST_BE_ARRAY: 'Service must be array',
  SERVICESS_IS_REQUIRED: 'Service is required',
  SERVICES_NOT_FOUND: 'Service not found',
  DIAGNOSIS_IS_REQUIRED: 'Diagosis is required',
  DIAGNOS_MUST_BE_STRING: 'Diagosis must be a string',
  NOTE_IS_REQUIRED: 'Note is required',
  NOTE_MUST_BE_STRING: 'Note must be a string',
  APPOINTMENT_IS_REQUIRED: 'Appointment is required',
  APPOINTMENT_MUST_BE_STRING: 'Appointment must be a string',
  APPOINTMENT_NOT_FOUND: 'Appointment not found',
  ID_IS_REQUIRED: 'Id is required',
  MEDICAL_RECORD_NOT_FOUND: 'Medical record not found',
  APPOINTMENT__ALREADY_EXIST_IN_MEDICAL_RECORD: 'Appointment already exists in medical record'
} as const

export const APPOINTMENT_MESSAGES = {
  CREATE_APPOINTMENT_SUCCESS: 'Create appointment successfully',
  UPDATE_APPOINTMENT_SUCCESS: 'Update appointment successfully',
  GET_APPOINTMENT_SUCCESS: 'Get appointment successfully',
  GET_APPOINTMENTS_SUCCESS: 'Get appointments successfully',
  DELETE_APPOINTMENT_SUCCESS: 'Delete appointment successfully',
  DATE_MUST_BE_TO_ISO_STRING: 'Date must be in ISO string format',
  DATE_IS_REQUIRED: 'Date is required',
  DOCTOR_ID_IS_REQUIRED: 'Doctors ID must be provided',
  DOCTOR_ID_IS_MUST_BE_A_STRING: 'Doctor ID must be a string',
  DOCTOR_NOT_FOUND: 'Doctor not found',
  PATIENT_ID_IS_REQUIRED: 'Patient id is required',
  PATIENT_ID_IS_MUST_BE_A_STRING: 'Patient ID must be a string',
  PATIENT_NOT_FOUND: 'Patient not found',
  ID_IS_REQUIRED: 'ID is required',
  APPOINTMENT_NOT_FOUND: 'Appointment not found'
} as const

export const STAFF_SCHEDULE_MESSAGES = {
  CREATE_STAFF_SCHEDULE_SUCCESS: 'Create staff schedule successfully',
  UPDATE_STAFF_SCHEDULE_SUCCESS: 'Update staff schedule successfully',
  GET_STAFF_SCHEDULE_SUCCESS: 'Get staff schedule successfully',
  GET_STAFF_SCHEDULES_SUCCESS: 'Get staff schedules successfully',
  DELETE_STAFF_SCHEDULE_SUCCESS: 'Delete staff schedule successfully',
  DATE_MUST_BE_ISO_STRING: 'Date must be a valid ISO string',
  DATE_IS_REQUIRED: 'Date is required',
  STAFF_ID_IS_REQUIRED: 'Staff id is required',
  STAFF_MUST_BE_A_STRING: 'Staff must be a string',
  STAFF_NOT_FOUND: 'Staff not found',
  SHIFT_IS_REQUIRED: 'Shift is required',
  SHIFT_MUST_BE_STRING: 'Shift must be a string',
  ID_IS_REQUIRED: 'Id is required',
  STAFF_SCHEDULE_NOT_FOUND: 'Staff schedule not found'
} as const

export const BILL_MESSAGES = {
  CREATE_BILL_SUCCESS: 'Create bill successfully',
  UPDATE_BILL_SUCCESS: 'Update bill successfully',
  GET_BILL_SUCCESS: 'Get bill successfully',
  GET_BILLS_SUCCESS: 'Get bills successfully',
  DELETE_BILL_SUCCESS: 'Delete bill successfully',
  MEDICAL_RECORD_IS_REQUIRED: 'Medical record is required',
  MEDICAL_RECORD_NOT_FOUND: 'Medical record not found',
  MEDICAL_RECORD_MUST_BE_STRING: 'Medical record must be string',
  MEDICAL_RECORD_ALREADY_EXISTS: 'Medical record already exists',
  AMOUNT_IS_REQUIRED: 'Amount is required',
  AMOUNT_MUST_BE_STRING: 'Amount must be string',
  ID_IS_REQUIRED: 'ID is required',
  BILL_NOT_FOUND: 'Bill not found'
} as const

export const PRESCRIPTION_MESSAGES = {
  CREATE_PRESCRIPTION_SUCCESS: 'Create prescription successfully',
  UPDATE_PRESCRIPTION_SUCCESS: 'Update prescription successfully',
  GET_PRESCRIPTION_SUCCESS: 'Get prescription successfully',
  GET_PRESCRIPTIONS_SUCCESS: 'Get prescriptions successfully',
  DELETE_PRESCRIPTION_SUCCESS: 'Delete prescription successfully',
  MEDICAL_RECORD_IS_REQUIRED: 'Medical record is required',
  MEDICAL_RECORD_MUST_BE_STRING: 'Medical record must be string',
  MEDICAL_RECORD_NOT_FOUND: 'Medical record not found',
  ID_IS_REQUIRED: 'ID is required',
  PRESCRIPTION_NOT_FOUND: 'Prescription not found',
  MEDICINE_MUST_BE_ARRAY: 'Medication must be provided in the format array',
  MEDICINE_IS_REQUIRED: 'Medicine is required',
  MEDICINE_NOT_FOUND: 'Medicine not found',
  MEDICAL_ALREADY_EXIST: 'Medical already existss'
} as const

export const PRESCRIPTION_DETAIL_MESSAGES = {
  CREATE_PRESCRIPTION_DETAIL_SUCCESS: 'Create prescription detail successfully',
  UPDATE_PRESCRIPTION_DETAIL_SUCCESS: 'Update prescription detail successfully',
  GET_PRESCRIPTION_DETAIL_SUCCESS: 'Get prescription detail successfully',
  GET_PRESCRIPTION_DETAILS_SUCCESS: 'Get prescription details successfully',
  DELETE_PRESCRIPTION_DETAIL_SUCCESS: 'Delete prescription successfully'
} as const
