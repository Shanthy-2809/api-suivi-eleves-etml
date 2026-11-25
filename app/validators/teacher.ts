import vine from '@vinejs/vine'

export const teacherValidator = vine.create({
  name: vine.string().minLength(2).maxLength(255),
  firstname: vine.string().minLength(2).maxLength(255),
  email: vine.string().email().maxLength(255),
  userId: vine.number().exists({ table: 'users', column: 'id' }),
})
