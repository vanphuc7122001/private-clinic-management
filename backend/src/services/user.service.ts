import { RegisterReqBody, TokenPayload } from '~/models/requests/User.requests'
import databaseService from './database.service'
import { hashPassword } from '~/utils/crypto'
import User from '~/models/schemas/User.schema'
import { signToken } from '~/utils/jwt'
import { Roles, TokenType } from '~/constants/enum'
import { envConfig } from '~/constants/config'

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

  private signForgotPasswordToken({ user_id, is_patient, role }: PayloadToken) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.ForgotPasswordToken,
        is_patient,
        role
      },
      privateKey: envConfig.jwtSecretForgotPasswordToken,
      options: {
        expiresIn: envConfig.jwtExpiredForGotPassworToken
      }
    })
  }

  private signAccessAndRefreshToken({ user_id, verify }: PayloadToken) {
    return Promise.all([this.signAccessToken({ user_id, verify }), this.signRefreshToken({ user_id, verify })])
  }

  private decodeRefreshToken(refresh_token: string) {
    return verifyToken({
      token: refresh_token,
      secretOrPublicKey: envConfig.jwtSecretRefreshToken
    })
  }
  async register(payload: RegisterReqBody) {
    const password = payload.password ? hashPassword(payload.password) : undefined
    const [user, role] = await Promise.all([
      databaseService.users.create({
        data: new User({ ...payload, password }),
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
  }
}

const userService = new UserService()
export default userService
