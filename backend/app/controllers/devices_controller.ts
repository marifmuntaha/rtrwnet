import type { HttpContext } from '@adonisjs/core/http'
import Device from '#models/device'
import { deviceStoreValidation, deviceUpdateValidation } from '#validators/device'
import { Routeros } from 'routeros-node'

export default class DevicesController {
  async index({ auth, response }: HttpContext) {
    try {
      const user = auth.user
      const device = Device.query()
      if (user?.role === '2') {
        await device.where('userId', user.id)
      }
      const devices = await device.orderBy('name', 'asc')
      return response.status(200).json({
        result: devices,
      })
    } catch (error) {
      return response.status(400).json({
        message: error.messages ? error.messages[0].message : error,
      })
    }
  }

  async store({ auth, request, response }: HttpContext) {
    try {
      const data = request.all()
      data.userId = auth.user?.id
      const payload = await deviceStoreValidation.validate(data)
      const store = await Device.create(payload)
      if (store) {
        return response.status(200).json({
          message: 'Perangkat berhasil ditambahkan.',
          result: store,
        })
      }
    } catch (error) {
      return response.status(400).json({
        message: error.messages ? error.messages[0].message : error,
      })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const device = await Device.findOrFail(params.id)
      if (device) {
        return response.status(200).json({
          result: device,
        })
      }
    } catch (error) {
      return response.status(400).json({
        message: error.messages ? error.messages[0].message : error,
      })
    }
  }

  async update({ request, response }: HttpContext) {
    try {
      const data = request.all()
      const payload = await deviceUpdateValidation.validate(data)
      const device = await Device.findOrFail(payload.id)
      const update = await device.merge(payload).save()
      if (update) {
        return response.status(200).json({
          message: 'Perangkat berhasil diperbarui.',
        })
      }
    } catch (error) {
      return response.status(400).json({
        message: error.messages ? error.messages[0].message : error,
      })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const device = await Device.findOrFail(params.id)
      await device.delete()
      return response.status(200).json({
        message: 'Perangkat berhasil dihapus.',
      })
    } catch (error) {
      return response.status(400).json({
        message: error.messages ? error.messages[0].message : error,
      })
    }
  }

  async connect({ params, request, response }: HttpContext) {
    const device = await Device.findOrFail(params.id)
    const data = request.all()
    const routeros = new Routeros({
      host: device.host,
      port: device.port,
      user: device.user,
      password: device.password,
    })
    try {
      const conn = await routeros.connect()
      const result = await conn.write(data.params)
      if (result) {
        return response.status(200).json({
          result: result,
        })
      }
    } catch (error) {
      return response.status(400).json({
        message: error.messages ? error.messages[0].message : error,
      })
    } finally {
      routeros.destroy()
    }
  }
}
