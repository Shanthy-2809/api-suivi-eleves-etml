import type { HttpContext } from '@adonisjs/core/http'
import ClassGroup from '#models/class_group'
import { classGroupValidator } from '#validators/class_group'

export default class ClassGroupsController {
  /**
   * Récupérer toutes les classes
   */
  async index({ response }: HttpContext) {
    const classGroups = await ClassGroup.query().preload('teacher').orderBy('name', 'asc')

    return response.ok(classGroups)
  }

  /**
   * Récupérer une classe
   */
  async show({ params, response }: HttpContext) {
    const classGroup = await ClassGroup.findOrFail(params.id)

    return response.ok(classGroup)
  }

  /**
   * Créer une nouvelle classe
   */
  async store({ request, response }: HttpContext) {
    // Récupération des données envoyées par le client et validation des données
    const { name, teacherId } = await request.validateUsing(classGroupValidator)
    // Création d'une nouvelle classe avec les données validées

    const classGroup = await ClassGroup.create({ name, teacherId })

    // On utilise `response.created` pour retourner un code HTTP 201 avec les données de la classecréée

    return response.created(classGroup)
  }

  /**
   * Modifier une classe
   */
  async update({ params, request, response }: HttpContext) {
    const data = await request.validateUsing(classGroupValidator)

    const classGroup = await ClassGroup.findOrFail(params.id)

    classGroup.merge(data)

    await classGroup.save()

    return response.ok(classGroup)
  }

  /**
   * Supprimer une classe
   */
  async destroy({ params, response }: HttpContext) {
    const classGroup = await ClassGroup.findOrFail(params.id)

    await classGroup.delete()

    return response.noContent()
  }
}
