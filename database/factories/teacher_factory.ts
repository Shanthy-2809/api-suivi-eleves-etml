import Factory from '@adonisjs/lucid/factories'
import Teacher from '#models/teacher'

export const TeacherFactory = Factory.define(Teacher, async ({ faker }) => {
  return {
    name: faker.person.lastName(),
    firstname: faker.person.firstName(),
    email: faker.internet.email(),
  }
}).build()
