import vine from '@vinejs/vine'

export const classGroupValidator = vine.create({
  name: vine.string().minLength(2).maxLength(255),
  teacherId: vine.number().exists({ table: 'teachers', column: 'id' }).nullable().optional(),
})
