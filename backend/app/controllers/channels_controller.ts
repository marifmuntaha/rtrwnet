import type { HttpContext } from '@adonisjs/core/http'

import axios from 'axios'
import env from '#start/env'

export default class ChannelsController {
  async index({ response }: HttpContext) {
    await axios
      .get(`${env.get('TRIPAY_ENDPOINT')}/merchant/payment-channel`, {
        headers: {
          Authorization: `Bearer ${env.get('TRIPAY_API_KEY')}`,
          // @ts-ignore
          validateStatus: (status) => status < 999,
        },
      })
      .then((resp) => {
        return response.status(200).json({
          result: resp.data,
        })
      })
      .catch((error) => {
        return response.status(400).json({
          message: error.message,
        })
      })
  }
}
