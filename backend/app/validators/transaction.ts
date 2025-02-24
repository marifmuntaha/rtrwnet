import vine from '@vinejs/vine'

export const transactionStoreValidation = vine.compile(
  vine.object({
    method: vine.string(),
    customer_name: vine.string(),
    customer_email: vine.string(),
    customer_phone: vine.string(),
    orders_item: vine.array(
      vine.object({
        sku: vine.string(),
        name: vine.string(),
        price: vine.number(),
        quantity: vine.number(),
      })
    ),
    amount: vine.number(),
    expire_time: vine.number().optional(),
    signature: vine.string().optional(),
  })
)
