import type { HttpContext } from '@adonisjs/core/http'
import { loginPostValidator, registerPostValidation } from '#validators/auth'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'
import Subscribe from '#models/subscribe'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    try {
      const data = request.all()
      const payload = await registerPostValidation.validate(data)
      payload.role = '2'
      const user = await User.create(payload)
      if (user) {
        return response.status(201).json({
          message: 'Pendaftaran berhasil silahkan masuk.',
          result: {
            user: user,
            token: await User.accessTokens.create(user),
          },
        })
      }
    } catch (error) {
      return response.status(400).json({
        message: error.messages ? error.messages[0].message : error.message,
      })
    }
  }

  async login({ request, response }: HttpContext) {
    try {
      const data = request.all()
      const payload = await loginPostValidator.validate(data)
      const user = await User.findByOrFail('username', payload.username).catch(() => {
        throw new Error('Nama pengguna/kata sandi tidak tepat.')
      })
      if (user) {
        if (await hash.verify(user.password, payload.password)) {
          return response.status(200).json({
            message: 'Berhasil masuk, anda akan dialihkan dalam 2 detik.',
            result: {
              user: user,
              token: await User.accessTokens.create(user),
              subscription: await Subscribe.findBy('userId', user.id),
            },
          })
        } else {
          // noinspection ExceptionCaughtLocallyJS
          throw new Error('Nama pengguna/kata sandi tidak tepat.')
        }
      } else {
        // noinspection ExceptionCaughtLocallyJS
        throw new Error('Nama pengguna/kata sandi tidak tepat.')
      }
    } catch (error) {
      return response.status(401).json({
        message: error.messages ? error.messages[0].message : error.message,
      })
    }
  }

  async reset({ request, response }: HttpContext) {
    try {
      const data = request.all()
      const user = await User.findByOrFail('email', data.email)
      if (user) {
        return response.status(200).json({
          message: 'Link tautan untuk mereset kata sandi terkirim.',
        })
      }
    } catch (error) {
      return response.status(400).json({
        message: error.messages ? error.messages[0].message : error.message,
      })
    }
  }

  async change({ request, response }: HttpContext) {
    try {
      const data = request.all()
      const user = await User.findByOrFail('email', data.email)
      if (user) {
        return response.status(200).json({
          message: 'Kata sandi berhasil diperbarui.',
        })
      }
    } catch (error) {
      return response.status(400).json({
        message: error.messages ? error.messages[0].message : error.message,
      })
    }
  }

  async logout({ request, response }: HttpContext) {
    try {
      const { id } = request.all()
      const user = await User.findOrFail(id)
      const token = await User.accessTokens.delete(user, '1')
      if (token) {
        return response.status(200).json({
          message: 'Berhasil keluar.',
        })
      }
    } catch (error) {
      return response.status(400).json({
        message: error.messages ? error.messages[0].message : error.message,
      })
    }
  }
}
