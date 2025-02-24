import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
      table.integer('device_id').unsigned().references('devices.id').onDelete('CASCADE')
      table.string('product_id')
      table.string('name')
      table.string('local_address').nullable()
      table.string('remote_address').nullable()
      table.string('rate_limit').nullable()
      table.string('price')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
