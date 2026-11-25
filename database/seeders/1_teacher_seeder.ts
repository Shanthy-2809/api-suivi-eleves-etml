import User from '#models/user'
import Teacher from '#models/teacher'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class TeacherSeeder extends BaseSeeder {
  async run() {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Ne pas exécuter le seeder des comptes de démonstration en production')
    }

    // Identités de démonstration, sans utiliser les vrais emails de l'établissement.
    // Mot de passe uniquement pour tester en local. Change-le avant une mise en ligne.
    const password = process.env.SEED_TEACHER_PASSWORD ?? '0123456789'
    const teachersData = [
      { firstname: 'Grégory', name: 'Charmier', email: 'gregory.charmier@example.test' },
      { firstname: 'Antoine', name: 'Mveng', email: 'antoine.mveng@example.test' },
      { firstname: 'Gaël', name: 'Sonney', email: 'gael.sonney@example.test' },
      { firstname: 'Alain', name: 'Girardet', email: 'alain.girardet@example.test' },
    ]

    for (const teacher of teachersData) {
      const user = await User.firstOrCreate(
        { email: teacher.email },
        { fullName: `${teacher.firstname} ${teacher.name}`, email: teacher.email, password, role: 'teacher' }
      )
      await Teacher.updateOrCreate(
        { email: teacher.email },
        { ...teacher, userId: user.id }
      )
    }
  }
}
