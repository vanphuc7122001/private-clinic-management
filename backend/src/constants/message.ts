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
  NOT_PERMISSION: 'Not allowed to access this resource'
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
  ID_IS_REQUIRED: 'ID is required'
} as const

export const SPECIALLIZATION_MESSAGES = {
  SPECIALIZATION_MUST_BE_STRING: 'Specialization must be a string',
  SPECIALIZATION_IS_REQUIRED: 'Specialization is required',
  SPECIALIZATION_ALREADY_EXISTS: 'Specialization already exists',
  CREATE_SPECIALIZATION_SUCCESS: 'Create specialization successfully',
  GET_ALL_SPECIALIZATIONS_SUCCESS: 'Get all specializations successfully',
  UPDATE_SPECIALIZATION_SUCCESS: 'Update specialization successfully',
  DELETE_SPECIALIZATION_SUCCESS: 'Delete specialization successfully',
  ID_IS_REQUIRED: 'ID is required'
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
  DELETE_NEWS_SUCCESS: 'Delete news articles successfully'
} as const
