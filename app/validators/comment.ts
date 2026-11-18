import vine from '@vinejs/vine'
export const commentValidator = vine.create({
  content: vine.string().minLength(2),
})
