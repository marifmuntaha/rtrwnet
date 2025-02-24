import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare deviceId: number

  @column()
  declare productId: string

  @column()
  declare name: string

  @column()
  declare localAddress: string

  @column()
  declare remoteAddress: string

  @column()
  declare rateLimit: string

  @column()
  declare price: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
