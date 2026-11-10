import Student from '#models/student'
import type { HttpContext } from '@adonisjs/core/http'

export default class StudentsController {
  async index({ response }: HttpContext) {
    const students = await Student.query().orderBy('name').orderBy('firstname')

    return response.ok(students)
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['name', 'firstname'])

    const student = await Student.create(data)

    return response.created(student)
  }

  async show({ params, response }: HttpContext) {
    const student = await Student.findOrFail(params.id)

    return response.ok(student)
  }

  /**
   * Mettre à jour un élève
   *
   * Cette méthode est utilisée pour mettre à jour les informations d'un élève que ce soit :
   * - pour une modification complète (PUT)
   * - ou une modification partielle (PATCH)
   */
  async update({ params, request, response }: HttpContext) {
    const data = request.only(['name', 'firstname'])

    const student = await Student.findOrFail(params.id)

    student.merge(data)

    await student.save()

    return response.ok(student)
  }

  /**
   * Supprimer un élève
   */
  async destroy({ params, response }: HttpContext) {
    const student = await Student.findOrFail(params.id)
    await student.delete()

    return response.noContent()
  }
}
