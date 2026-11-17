import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'class_groups'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()

      // Relation : 1 classe → 1 enseignant
      table
        .integer('teacher_id') // on ajoute une colonne teacher_id correspondant au maître declasse
        .unsigned() // la valeur ne peut pas être négative
        .nullable() // une classe peut ne pas (encore) avoir d'enseignant responsable
        .references('id') // teacher_id fait référence à la colonne id d'une autre table. C'est celien qui définit la clé étrangère.
        .inTable('teachers') // Précise dans quelle table se trouve la colonne id référencée.

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
