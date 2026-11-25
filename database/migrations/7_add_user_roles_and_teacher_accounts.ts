import { BaseSchema } from '@adonisjs/lucid/schema'

/** Safe additive migration: preserves existing records and works after the first six migrations. */
export default class extends BaseSchema {
  async up() {
    if (!(await this.schema.hasColumn('users', 'role'))) {
      this.schema.alterTable('users', (table) => {
        table.string('role', 20).notNullable().defaultTo('teacher')
      })
    }

    if (!(await this.schema.hasColumn('teachers', 'user_id'))) {
      this.schema.alterTable('teachers', (table) => {
        table.integer('user_id').unsigned().nullable().unique()
          .references('id').inTable('users').onDelete('CASCADE')
      })
    }
  }

  async down() {
    if (await this.schema.hasColumn('teachers', 'user_id')) {
      this.schema.alterTable('teachers', (table) => table.dropColumn('user_id'))
    }
    if (await this.schema.hasColumn('users', 'role')) {
      this.schema.alterTable('users', (table) => table.dropColumn('role'))
    }
  }
}
