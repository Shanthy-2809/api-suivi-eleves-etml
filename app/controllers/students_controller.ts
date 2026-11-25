import Student from '#models/student'
import type { HttpContext } from '@adonisjs/core/http'
import { studentValidator, getStudentsQueryValidator } from '#validators/student'

export default class StudentsController {
  /** GET /api/students: search, filter, sort, paginate. */
  async index({ response, request }: HttpContext) {
    const {
      page = 1,
      limit = 10,
      sort = 'name',
      order = 'asc',
      classGroupId,
      search,
    } = await request.validateUsing(getStudentsQueryValidator)

    const query = Student.query().preload('classGroup').preload('comments')
    if (classGroupId !== undefined) {
      query.where('class_group_id', classGroupId)
    }
    if (search) {
      // MySQL: LIKE (not ILIKE, which is PostgreSQL-specific).
      query.where((subQuery) => {
        subQuery.where('name', 'like', `%${search}%`)
          .orWhere('firstname', 'like', `%${search}%`)
      })
    }
    query.orderBy(sort, order).orderBy('id', 'asc')
    const students = await query.paginate(page, limit)
    students.baseUrl('/api/students')
    students.queryString({ page, limit, sort, order, ...(classGroupId !== undefined ? { classGroupId } : {}), ...(search ? { search } : {}) })
    return response.ok(students)
  }

  async show({ params, response }: HttpContext) {
    const student = await Student.query().preload('classGroup').preload('comments').where('id', params.id).firstOrFail()
    return response.ok(student)
  }

  async store({ request, response }: HttpContext) {
    const { name, firstname, classGroupId } = await request.validateUsing(studentValidator)
    const student = await Student.create({ name, firstname, classGroupId: classGroupId ?? null })
    return response.created(student)
  }

  async update({ params, request, response }: HttpContext) {
    const data = await request.validateUsing(studentValidator)
    const student = await Student.findOrFail(params.id)
    student.merge(data)
    await student.save()
    return response.ok(student)
  }

  async destroy({ params, response }: HttpContext) {
    const student = await Student.findOrFail(params.id)
    await student.delete()
    return response.noContent()
  }
}
