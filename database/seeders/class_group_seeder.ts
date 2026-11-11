import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { ClassGroupFactory } from '#database/factories/class_group_factory'

export default class ClassGroupSeeder extends BaseSeeder {
  async run() {
    // Crée 10 classes
    await ClassGroupFactory.createMany(10)
  }
}
