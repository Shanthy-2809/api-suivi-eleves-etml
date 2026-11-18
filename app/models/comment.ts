import { CommentSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Student from '#models/student'
import Teacher from '#models/teacher'

export default class Comment extends CommentSchema {
  // Relation : 1 commentaire → 1 élève
  @belongsTo(() => Student)
  declare student: BelongsTo<typeof Student>

  // Relation : 1 commentaire → 1 enseignant
  @belongsTo(() => Teacher)
  declare teacher: BelongsTo<typeof Teacher>
}
