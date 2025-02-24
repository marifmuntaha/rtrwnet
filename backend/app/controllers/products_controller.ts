import type { HttpContext } from '@adonisjs/core/http'
import Product from '#models/product'
import { productStoreValidation, productUpdateValidation } from '#validators/product'

export default class ProductsController {
  async index({ auth, response }: HttpContext) {
    try {
      const user = auth.user
      const product = Product.query()
      if (user?.role === '2') {
        await product.where('userId', user.id)
      }
      const products = await product.orderBy('name', 'asc')
      return response.status(200).json({
        result: products,
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
      const payload = await productStoreValidation.validate(data)
      const product = await Product.create(payload)
      if (product) {
        return response.status(201).json({
          message: 'Produk berhasil ditambahkan',
          result: product,
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
      const product = await Product.findOrFail(params.id)
      if (product) {
        return response.status(200).json({
          result: product,
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
      const payload = await productUpdateValidation.validate(data)
      const product = await Product.findOrFail(payload.id)
      const update = await product.merge(payload).save()
      if (update) {
        return response.status(200).json({
          message: 'Produk berhasil diperbarui',
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
      const product = await Product.findOrFail(params.id)
      await product.delete()
      return response.status(200).json({
        message: 'Produk berhasil dihapus',
      })
    } catch (error) {
      return response.status(400).json({
        message: error.messages ? error.messages[0].message : error.message,
      })
    }
  }
}
