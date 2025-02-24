import vine from '@vinejs/vine'

export const userStoreValidation = vine.compile(
  vine.object({
    fullName: vine.string(),
    email: vine.string(),
    phone: vine.number(),
    username: vine.string().unique(async (db, value) => {
      const user = await db.from('users').where('username', value).first()
      return !user
    }),
    password: vine.string().minLength(8).maxLength(32).confirmed(),
    role: vine.string(),
  })
)

export const userUpdateValidation = vine.compile(
  vine.object({
    id: vine.number(),
    fullName: vine.string(),
    email: vine.string(),
    phone: vine.number(),
    username: vine.string(),
    password: vine.string().minLength(8).maxLength(32).confirmed(),
    role: vine.string(),
  })
)
