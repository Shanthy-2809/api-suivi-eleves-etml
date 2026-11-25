import vine from '@vinejs/vine'

export const studentValidator = vine.create({
  name: vine.string().minLength(2).maxLength(255),
  firstname: vine.string().minLength(2).maxLength(255),
  classGroupId: vine.number().min(1).exists({ table: 'class_groups', column: 'id' }).nullable().optional(),
})

// Step 14: validate every pagination, sort, search and filter argument.
export const getStudentsQueryValidator = vine.create({
  page: vine.number().min(1).optional(),
  limit: vine.number().min(1).max(100).optional(),
  sort: vine.enum(['name', 'firstname', 'created_at']).optional(),
  order: vine.enum(['asc', 'desc']).optional(),
  classGroupId: vine.number().min(1).optional(),
  search: vine.string().trim().minLength(1).optional(),
})
