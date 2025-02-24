import vine from '@vinejs/vine'
import { DateTime } from 'luxon'

export const subscribeStoreValidation = vine.compile(
  vine.object({
    userId: vine.number().unique(async (db, value) => {
      const subscribe = await db.from('subscribes').where('user_id', value).first()
      return !subscribe
    }),
    due: vine
      .date({
        formats: 'YYYY-MM-DD',
      })
      .transform((date) => DateTime.fromJSDate(date)),
    status: vine.string(),
  })
)

export const subscribeUpdateValidation = vine.compile(
  vine.object({
    id: vine.number(),
    userId: vine.number(),
    due: vine
      .date({
        formats: 'YYYY-MM-DD',
      })
      .transform((date) => DateTime.fromJSDate(date)),
    status: vine.string(),
  })
)
