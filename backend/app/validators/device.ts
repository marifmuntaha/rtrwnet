import vine from '@vinejs/vine'

export const deviceStoreValidation = vine.compile(
  vine.object({
    userId: vine.number(),
    name: vine.string(),
    host: vine.string().ipAddress(4),
    port: vine.number(),
    user: vine.string(),
    password: vine.string(),
  })
)

export const deviceUpdateValidation = vine.compile(
  vine.object({
    id: vine.number(),
    userId: vine.number(),
    name: vine.string(),
    host: vine.string().ipAddress(4),
    port: vine.number(),
    user: vine.string(),
    password: vine.string(),
  })
)
