import vine from '@vinejs/vine'

export const productStoreValidation = vine.compile(
  vine.object({
    userId: vine.number(),
    deviceId: vine.number(),
    productId: vine.string(),
    name: vine.string(),
    localAddress: vine.string().ipAddress(4).optional(),
    remoteAddress: vine.string().ipAddress(4).optional(),
    rateLimit: vine.string().optional(),
    price: vine.string(),
  })
)

export const productUpdateValidation = vine.compile(
  vine.object({
    id: vine.number(),
    userId: vine.number(),
    deviceId: vine.number(),
    productId: vine.string(),
    name: vine.string(),
    localAddress: vine.string().ipAddress(4).optional(),
    remoteAddress: vine.string().ipAddress(4).optional(),
    rateLimit: vine.string().optional(),
    price: vine.string(),
  })
)
