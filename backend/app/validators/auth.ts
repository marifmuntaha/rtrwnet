import vine from '@vinejs/vine'

export const registerPostValidation = vine.compile(
  vine.object({
    fullName: vine.string(),
    email: vine.string(),
    phone: vine.number(),
    username: vine.string().unique(async (db, value) => {
      const user = await db.from('users').where('username', value).first()
      return !user
    }),
    password: vine.string().minLength(8).maxLength(32).confirmed(),
    role: vine.string().optional(),
  })
)

export const loginPostValidator = vine.compile(
  vine.object({
    username: vine.string(),
    password: vine.string(),
  })
)
