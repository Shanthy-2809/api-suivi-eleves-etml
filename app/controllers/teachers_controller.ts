import type { HttpContext } from '@adonisjs/core/http'
import Teacher from '#models/teacher'
import { teacherValidator } from '#validators/teacher'

export default class TeachersController {
  /**
   * Récupérer tous les enseignants
   */
  async index({ response }: HttpContext) {
    const teachers = await Teacher.query().orderBy('name').orderBy('firstname')

    return response.ok(teachers)
  }

  /**
   * Récupérer un enseignant
   */
  async show({ params, response }: HttpContext) {
    const teacher = await Teacher.findOrFail(params.id)

    return response.ok(teacher)
  }

  /**
   * Ajouter un enseignant
   */
  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(teacherValidator)

    const teacher = await Teacher.create(data)

    return response.created(teacher)
  }

  /**
   * Modifier un enseignant
   */
  async update({ params, request, response }: HttpContext) {
    const data = await request.validateUsing(teacherValidator)

    const teacher = await Teacher.findOrFail(params.id)

    teacher.merge(data)

    await teacher.save()

    return response.ok(teacher)
  }

  /**
   * Supprimer un enseignant
   */
  async destroy({ params, response }: HttpContext) {
    const teacher = await Teacher.findOrFail(params.id)

    await teacher.delete()

    return response.noContent()
  }
}
