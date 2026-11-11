import vine from '@vinejs/vine'
export const studentValidator = vine.create({
  name: vine.string().minLength(2).maxLength(255),
  firstname: vine.string().minLength(2).maxLength(255),
})
