import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { TeacherFactory } from '#database/factories/teacher_factory'

export default class TeacherSeeder extends BaseSeeder {
  async run() {
    // Crée 10 enseignants
    await TeacherFactory.createMany(10)
  }
}
