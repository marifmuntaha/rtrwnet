import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { userStoreValidation, userUpdateValidation } from '#validators/user'

export default class UsersController {
  async index({ response }: HttpContext) {
    try {
      const user = await User.all()
      return response.status(200).json({
        result: user,
      })
    } catch (error) {
      return response.status(400).json({
        error: error.messages ? error.messages[0].message : error,
      })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.all()
      const payload = await userStoreValidation.validate(data)
      const user = await User.create(payload)
      if (user) {
        return response.status(201).json({
          message: 'Pengguna berhasi ditambahkan',
          result: user,
        })
      }
    } catch (error) {
      return response.status(400).json({
        error: error.messages ? error.messages[0].message : error,
      })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const user = await User.query().preload('subscribe').where({ id: params.id }).first()
      if (user) {
        return response.status(200).json({
          result: user,
        })
      }
    } catch (error) {
      return response.status(400).json({
        error: error.messages ? error.messages[0].message : error,
      })
    }
  }

  async update({ request, response }: HttpContext) {
    try {
      const data = request.all()
      const payload = await userUpdateValidation.validate(data)
      const user = await User.findOrFail(payload.id)
      const update = await user.merge(payload).save()
      if (update) {
        return response.status(200).json({
          message: 'Pengguna berhasi diperbarui.',
          result: update,
        })
      }
    } catch (error) {
      return response.status(400).json({
        error: error.messages ? error.messages[0].message : error,
      })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const user = await User.findOrFail(params.id)
      await user.delete()
      return response.status(200).json({
        message: 'Pengguna berhasi dihapus.',
        result: user,
      })
    } catch (error) {
      return response.status(400).json({
        error: error.messages ? error.messages[0].message : error,
      })
    }
  }
}
