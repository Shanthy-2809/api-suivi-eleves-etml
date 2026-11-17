import { ClassGroupSchema } from '#database/schema'
import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Teacher from '#models/teacher'
import Student from '#models/student'

export default class ClassGroup extends ClassGroupSchema {
  // Relation : 1 classe → 1 enseignant
  @belongsTo(() => Teacher)
  declare teacher: BelongsTo<typeof Teacher>

  // Une classe possède plusieurs élèves
  @hasMany(() => Student)
  declare students: HasMany<typeof Student>
}
