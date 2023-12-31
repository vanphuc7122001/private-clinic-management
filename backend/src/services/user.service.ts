import { RegisterReqBody, TokenPayload, UpdateMeReqBody } from '~/models/requests/User.requests'
import databaseService from './database.service'
import { hashPassword } from '~/utils/crypto'
import User from '~/models/schemas/User.schema'
import { signToken, verifyToken } from '~/utils/jwt'
import { Roles, TokenType } from '~/constants/enum'
import { envConfig } from '~/constants/config'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
import { sendEmailRegister, sendForgotPasswrodEmail } from '~/utils/email'
import { PaginationQuery } from '~/models/requests/Other.requests'
import { omit } from 'lodash'
import { equal } from 'assert'

interface PayloadToken {
  user_id: string
  role: Roles
  is_patient: boolean
  exp?: number
}

class UserService {
  private signAccessToken({ user_id, is_patient, role }: PayloadToken) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.AccessToken,
        is_patient,
        role
      },
      privateKey: envConfig.jwtSecretAccessToken,
      options: {
        expiresIn: envConfig.jwtExpiredAccessToken
      }
    })
  }

  private signRefreshToken({ user_id, exp, is_patient, role }: PayloadToken) {
    if (exp) {
      return signToken({
        payload: {
          user_id,
          token_type: TokenType.RefreshToken,
          exp
        },
        privateKey: envConfig.jwtSecretRefreshToken
      })
    }
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.RefreshToken,
        is_patient,
        role
      },
      privateKey: envConfig.jwtSecretRefreshToken,
      options: {
        expiresIn: envConfig.jwtExpiredRefreshToken
      }
    })
  }

  private signForgotPasswordToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.ForgotPasswordToken
      },
      privateKey: envConfig.jwtSecretForgotPasswordToken,
      options: {
        expiresIn: envConfig.jwtExpiredForGotPassworToken
      }
    })
  }

  private signAccessAndRefreshToken({ user_id, is_patient, role }: PayloadToken) {
    return Promise.all([
      this.signAccessToken({ user_id, is_patient, role }),
      this.signRefreshToken({ user_id, is_patient, role })
    ])
  }

  private decodeRefreshToken(refresh_token: string) {
    return verifyToken({
      token: refresh_token,
      secretOrPublicKey: envConfig.jwtSecretRefreshToken
    })
  }

  async register(payload: RegisterReqBody) {
    const password = payload.password ? hashPassword(payload.password) : undefined
    const date_of_birth = payload.date_of_birth ? new Date(payload.date_of_birth) : new Date()
    const isSendMailCheck = Boolean(payload.email && payload.password)
    const [user, role] = await Promise.all([
      databaseService.users.create({
        data: new User({ ...payload, password, date_of_birth }),
        select: {
          id: true,
          is_patient: true
        }
      }),
      databaseService.roles.findFirst({
        select: {
          name: true
        },
        where: {
          id: payload.role_id
        }
      })
    ])

    if (isSendMailCheck && payload.is_patient) {
      await sendEmailRegister({
        subject: 'Register user patient',
        title: 'send email when registering an account',
        content: `You have just successfully registered an account with a password ${payload.password}`,
        toAddress: payload.email as string
      })
    }

    if (isSendMailCheck && !payload.is_patient) {
      await sendEmailRegister({
        subject: 'Register user staff',
        title: 'Employee confirmation',
        content: `
        You have just become an employee of the clinic with: <br> <b>username: ${payload.email}</b>, <b>password: ${payload.password}</b>`,
        toAddress: payload.email as string
      })
    }

    const { is_patient, id: user_id } = user
    const name = role?.name as Roles

    const [access_token, refresh_token] = await this.signAccessAndRefreshToken({
      is_patient: is_patient,
      user_id,
      role: name
    })

    const { exp, iat } = await this.decodeRefreshToken(refresh_token)

    await databaseService.refreshTokens.create({
      data: new RefreshToken({ exp, iat, token: refresh_token, user_id })
    })

    return {
      access_token,
      refresh_token,
      id: user.id
    }
  }

  async login(email: string, password: string) {
    const user = await databaseService.users.findFirstOrThrow({
      where: {
        email: email
      },
      select: {
        is_patient: true,
        id: true,
        roles: {
          select: {
            name: true
          }
        }
      }
    })

    const { id: user_id, is_patient, roles } = user

    const [access_token, refresh_token] = await this.signAccessAndRefreshToken({
      is_patient,
      user_id,
      role: roles.name as Roles
    })

    const { iat, exp } = await this.decodeRefreshToken(refresh_token)

    await databaseService.refreshTokens.create({
      data: new RefreshToken({ exp, iat, token: refresh_token, user_id })
    })
    return {
      access_token,
      refresh_token
    }
  }

  async logout({ refresh_token, refresh_token_id }: { refresh_token: string; refresh_token_id: string }) {
    await databaseService.refreshTokens.delete({
      where: {
        id: refresh_token_id,
        token: refresh_token
      }
    })
  }

  async refreshToken({
    refresh_token_id,
    user_id,
    role,
    is_patient,
    exp,
    iat,
    refresh_token
  }: {
    refresh_token_id: string
    user_id: string
    role: Roles
    is_patient: boolean
    exp: number
    iat: number
    refresh_token: string
  }) {
    const [new_access_token, new_refresh_token] = await Promise.all([
      this.signAccessToken({ user_id, is_patient, role }),
      this.signRefreshToken({ user_id, exp, is_patient, role }),
      databaseService.refreshTokens.delete({
        where: {
          id: refresh_token_id,
          token: refresh_token
        }
      })
    ])

    await databaseService.refreshTokens.create({
      data: new RefreshToken({ exp, iat, token: new_refresh_token, user_id })
    })

    return {
      access_token: new_access_token,
      refresh_token: new_refresh_token
    }
  }

  async getMe(user_id: string) {
    const result = await databaseService.users.findFirstOrThrow({
      where: {
        id: user_id
      },
      select: {
        email: true,
        address: true,
        gender: true,
        name: true,
        phone: true,
        password: true,
        date_of_birth: true,
        avatar: true
      }
    })

    return result
  }

  async changePassword(user_id: string, password: string) {
    await databaseService.users.update({
      where: {
        id: user_id
      },
      data: {
        password: hashPassword(password)
      }
    })
  }

  async forgotPassword({ user_id, email }: { user_id: string; email: string }) {
    const forgot_password_token = await this.signForgotPasswordToken(user_id)

    Promise.all([
      databaseService.users.update({
        where: {
          id: user_id
        },
        data: {
          forgot_password_token
        }
      }),
      sendForgotPasswrodEmail({ forgot_password_token, subject: 'Verify Forgot Password', toAddress: email })
    ])
  }

  async resetPassword(user_id: string, password: string) {
    await databaseService.users.update({
      where: {
        id: user_id
      },
      data: {
        password: hashPassword(password),
        forgot_password_token: ''
      }
    })
  }

  async updateMe(user_id: string, payload: UpdateMeReqBody) {
    const _payload = payload.date_of_birth
      ? { ...payload, date_of_birth: new Date(payload.date_of_birth) }
      : { ...payload }
    const result = await databaseService.users.update({
      where: {
        id: user_id
      },
      data: {
        ..._payload
      }
    })

    return result
  }

  async getListUser(payload: PaginationQuery) {
    const page = Number(payload.page as string) || envConfig.page
    const limit = Number(payload.limit as string) || envConfig.limit
    const role = payload.role
    const { ...query } = omit(payload, ['page', 'limit', 'role'])
    const where: any = {}
    if (query) {
      for (const key in query) {
        const operator =
          key === 'is_patient'
            ? { equals: query[key] === 'false' ? false : true }
            : {
                contains: query[key]
              }
        where[key] = operator
      }
    }
    if (role) {
      where['roles'] = {
        name: {
          contains: role
        }
      }
    }
    const [total, users] = await Promise.all([
      databaseService.users.count({
        where
      }),
      databaseService.users.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          roles: true
        }
      })
    ])

    return {
      page,
      limit,
      users,
      total_page: Math.ceil(total / limit) || 0,
      total_record: total || 0
    }
  }
}

const userService = new UserService()
export default userService
