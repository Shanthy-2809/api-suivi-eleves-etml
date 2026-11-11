import vine from '@vinejs/vine'

export const classGroupValidator = vine.create({
  name: vine.string().minLength(2).maxLength(255),
})
