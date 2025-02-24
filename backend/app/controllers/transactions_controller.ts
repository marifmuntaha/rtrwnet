import type { HttpContext } from '@adonisjs/core/http'
import axios from 'axios'
import env from '#start/env'
import * as crypto from 'node:crypto'
import { randomInt } from 'node:crypto'
import { transactionStoreValidation } from '#validators/transaction'

export default class TransactionsController {
  async index({ response }: HttpContext) {
    await axios
      .get(`${env.get('TRIPAY_ENDPOINT')}/merchant/transactions`, {
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

  async store({ request, response }: HttpContext) {
    try {
      const data = request.all()
      const payload = await transactionStoreValidation.validate(data)
      // @ts-ignore
      payload.expire_time = Number.parseInt(Math.floor(new Date() / 1000) + 24 * 60 * 60)
      payload.signature = crypto
        // @ts-ignore
        .createHmac('sha256', env.get('TRIPAY_PRIVATE_KEY'))
        // @ts-ignore
        .update(env.get('TRIPAY_MERCHANT') + randomInt(99999) + data?.amount)
        .digest('hex')
      await axios
        .post(`${env.get('TRIPAY_ENDPOINT')}/merchant/transaction/create`, payload, {
          headers: {
            Authorization: `Bearer ${env.get('TRIPAY_API_KEY')}`,
            // @ts-ignore
            validateStatus: (status) => status < 999,
          },
        })
        .then((resp) => {
          return response.status(200).json({
            message: 'Transaction successfully created',
            result: resp.data,
          })
        })
        .catch((error) => {
          throw new Error(error.message)
        })
    } catch (error) {
      return response.status(400).json({
        message: error.messages ? error.messages[0].message : error.message,
      })
    }
  }
}
