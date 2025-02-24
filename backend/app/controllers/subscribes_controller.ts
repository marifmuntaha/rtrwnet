import type { HttpContext } from '@adonisjs/core/http'
import Subscribe from '#models/subscribe'
import { subscribeStoreValidation, subscribeUpdateValidation } from '#validators/subscribe'

export default class SubscribesController {
  async index({ response }: HttpContext) {
    try {
      const subscribes = await Subscribe.all()
      return response.status(200).json({
        result: subscribes,
      })
    } catch (error) {
      return response.status(400).json({
        message: error.messages ? error.messages[0].message : error.message,
      })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.all()
      const payload = await subscribeStoreValidation.validate(data)
      const subscribe = await Subscribe.create(payload)
      if (subscribe) {
        return response.status(200).json({
          message: 'Data langganan berhasil disimpan.',
          result: subscribe,
        })
      }
    } catch (error) {
      return response.status(400).json({
        message: error.messages ? error.messages[0].message : error.message,
      })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const subscribe = await Subscribe.findOrFail(params.id)
      if (subscribe) {
        return response.status(200).json({
          result: subscribe,
        })
      }
    } catch (error) {
      return response.status(400).json({
        message: error.messages ? error.messages[0].message : error.message,
      })
    }
  }

  async update({ request, response }: HttpContext) {
    try {
      const data = request.all()
      const payload = await subscribeUpdateValidation.validate(data)
      const subscribe = await Subscribe.findOrFail(payload.id)
      const update = await subscribe.merge(payload).save()
      if (update) {
        return response.status(200).json({
          message: 'Data langganan berhasil diperbarui.',
          result: update,
        })
      }
    } catch (error) {
      return response.status(400).json({
        message: error.messages ? error.messages[0].message : error.message,
      })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const subscribe = await Subscribe.findOrFail(params.id)
      await subscribe.delete()
      return response.status(200).json({
        message: 'Data langganan berhasil dihapus.',
        result: subscribe,
      })
    } catch (error) {
      return response.status(400).json({
        message: error.messages ? error.messages[0].message : error.message,
      })
    }
  }
}
