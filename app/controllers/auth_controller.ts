import type { HttpContext } from '@adonisjs/core/http'

import { loginValidator, registerValidator } from '#validators/auth_user'
import User from '#models/user'
import { Exception } from '@adonisjs/core/exceptions'
export default class AuthController {
  async login({ request, response, auth }: HttpContext) {
    const attributes = await loginValidator.validate(request.all())
    try {
      const user = await User.verifyCredentials(attributes.email, attributes.password)
      return response.ok({ token: await User.authTokens.create(user) })
    } catch (error) {
      return response.unprocessableEntity({ error: error.message })
    }
  }

  async register({ request, response }: HttpContext) {
    const attributes = await registerValidator.validate(request.all())

    try {
      const existUser = await User.query().where('email', attributes.email).first()
      if (existUser) {
        return response.unprocessableEntity({
          error: `The email ${attributes.email} is already exist.`,
        })
      }

      const user = await User.create(attributes)
      if (!user) {
        throw new Exception('User not register.')
      }
      return response.created({ success: 'register successfully.' })
    } catch (error) {
      return response.unprocessableEntity({ error: error.message })
    }
  }
}
