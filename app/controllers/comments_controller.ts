import Comment from '#models/comment'
import Student from '#models/student'
import CommentPolicy from '#policies/comment_policy'
import { commentValidator } from '#validators/comment'
import type { HttpContext } from '@adonisjs/core/http'

export default class CommentsController {
  async index({ params, response }: HttpContext) {
    const student = await Student.findOrFail(params.student_id)
    await student.load('comments', (query) => query.preload('teacher'))
    return response.ok(student.comments)
  }

  async store({ params, request, response, auth, bouncer }: HttpContext) {
    const { content } = await request.validateUsing(commentValidator)
    if (await bouncer.with(CommentPolicy).denies('create')) {
      return response.forbidden({ message: 'Vous ne pouvez pas créer de commentaire.' })
    }
    // Associe le commentaire au compte connecté (jamais un teacherId fourni par le client).
    const user = auth.getUserOrFail()
    const teacher = await user.related('teacher').query().first()
    if (!teacher && user.role !== 'admin') {
      return response.badRequest({ message: 'Aucun enseignant lié à ce compte.' })
    }
    await Student.findOrFail(params.student_id)
    const comment = await Comment.create({
      content,
      studentId: Number(params.student_id),
      teacherId: teacher?.id ?? null,
    })
    return response.created(comment)
  }

  async show({ params, response }: HttpContext) {
    const comment = await Comment.query().where('id', params.id)
      .where('student_id', params.student_id).preload('teacher').firstOrFail()
    return response.ok(comment)
  }

  async update({ params, request, response, bouncer }: HttpContext) {
    const { content } = await request.validateUsing(commentValidator)
    const comment = await Comment.query().where('id', params.id)
      .where('student_id', params.student_id).preload('teacher').firstOrFail()
    if (await bouncer.with(CommentPolicy).denies('update', comment)) {
      return response.forbidden({ message: "Vous n'êtes pas l'auteur de ce commentaire et ne pouvez pas le modifier." })
    }
    comment.content = content
    await comment.save()
    return response.ok(comment)
  }

  async destroy({ params, response, bouncer }: HttpContext) {
    const comment = await Comment.query().where('id', params.id)
      .where('student_id', params.student_id).preload('teacher').firstOrFail()
    if (await bouncer.with(CommentPolicy).denies('delete', comment)) {
      return response.forbidden({ message: "Vous n'êtes pas l'auteur de ce commentaire et ne pouvez pas le supprimer." })
    }
    await comment.delete()
    return response.noContent()
  }
}
