import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import Device from '#models/device'
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import Subscribe from '#models/subscribe'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['username'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fullName: string | null

  @column()
  declare email: string

  @column()
  declare phone: number

  @column()
  declare username: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare role: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(User, {
    expiresIn: '1 days',
    prefix: 'oath_',
    table: 'auth_access_tokens',
    type: 'auth_token',
    tokenSecretLength: 256,
  })

  @hasMany(() => Device, {
    foreignKey: 'userId',
    localKey: 'id',
  })
  declare devices: HasMany<typeof Device>

  @hasOne(() => Subscribe, {
    foreignKey: 'userId',
    localKey: 'id',
  })
  declare subscribe: HasOne<typeof Subscribe>
}
