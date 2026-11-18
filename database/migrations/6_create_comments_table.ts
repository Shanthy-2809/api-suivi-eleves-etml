import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'comments'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      // Contenu du commentaire
      table.text('content').notNullable()

      // Relation : 1 commentaire → 1 élève
      table
        .integer('student_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('students')
        .onDelete('CASCADE')

      // Relation : 1 commentaire → 1 enseignant
      table
        .integer('teacher_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('teachers')
        .onDelete('SET NULL')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
